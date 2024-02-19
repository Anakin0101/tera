import { Platform } from 'react-native';
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { RootState } from 'store/index';
import { METHOD_NAMES, URLS } from './constants';
import { setAccessToken, setPostponeEasyLogin, setRefreshToken } from 'store/slices/userInfo';
import { RefreshTokenAPIResponse } from './apis/authAPI/authAPI.types';
import { resetUserProfileInfo } from 'store/slices/profile';
import { NavigationRef } from 'navigation/index';
import { GUEST_NAVIGATOR } from 'navigation/ScreenNames';
import { StackActions } from '@react-navigation/native';
import i18next from 'i18next';
import { openToast } from 'utils/toast';

// ---- SWAGGER DOCUMENTATION ----
// http://10.213.0.136:4040/swagger/index.html
// https://middleware-tst.terabank.ge/swagger/index.html

// ---- API URL ----
const BASE_URL = 'http://10.213.0.136:4040/api/';
// export const BASE_URL = 'https://middleware-tst.terabank.ge/api/v1/';

// Everything other than: Banker / Conversations / Documents require /api/v1/Files/GetSecuredFileById
export const PUBLIC_IMAGE_URL = `${BASE_URL}${URLS.getFileByID}?FileId=`;

const mutex = new Mutex();

/**
 *
 * @param headers
 * @returns default headers, that will be used in all API request cycle
 */
const defaultHeaders = (
  headers: Headers,
  api: Pick<BaseQueryApi, 'getState'>,
  newAccessToken?: string,
) => {
  const state = api.getState() as RootState;
  const oldAccessToken = state?.userInfo?.accessToken || '';

  const accessToken = newAccessToken || oldAccessToken || '';

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  headers.set('X-Bank-ChannelId', '1000011');
  headers.set('X-Bank-Ostype', Platform.OS);
  headers.set('X-Bank-Devicedescription', 'Mobile-bank-terra');
  headers.set('X-Bank-DeviceId', state.deviceInfo.deviceId || '1');
  headers.set('X-Bank-UserAgent', state.deviceInfo.userAgent || '1');

  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: defaultHeaders,
});

export const baseQueryWithInterceptor: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError,
  any,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;

  let customHeaders: Record<string, string> = {};

  // We can pass custom headers, depending on a specific API request, just like this: {headerKey: "headerValue"}
  if (typeof args !== 'string') {
    if (args.headers && args.body && args.body.headers) {
      customHeaders = {
        ...(args.body.headers as Record<string, string>),
        ...(args.headers as Record<string, string>),
      };
      delete args.body.headers;
    } else if (!args.headers && args.body && args.body.headers) {
      customHeaders = {
        ...(args.body.headers as Record<string, string>),
      };
      delete args.body.headers;
    } else if (args.headers) {
      customHeaders = args.headers as Record<string, string>;
    }
  }

  //   then set the headers as it should: headers.set('headerKey', 'headerValue');
  const headers = defaultHeaders(new Headers(customHeaders), api);

  //   and lastly, merge default headers with custom ones, that have been provided in query
  const enhancedArgs = {
    ...args,
    headers,
  };

  await mutex.waitForUnlock();

  try {
    let result = await baseQuery(enhancedArgs, api, extraOptions);

    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const userIp = state.deviceInfo.userIp || '1';
          const deviceToken = state.deviceInfo.deviceToken || '1';
          const refreshToken = state.userInfo.refreshToken;

          const refreshResult = await baseQuery(
            {
              method: METHOD_NAMES.POST,
              url: URLS.refreshToken,
              headers: { 'X-Bank-UserIp': userIp },
              body: { refreshToken },
            },
            api,
            extraOptions,
          );

          if (
            refreshResult.data &&
            typeof refreshResult.data === 'object' &&
            'accessToken' in refreshResult.data &&
            !!refreshResult.data.accessToken &&
            'refreshToken' in refreshResult.data &&
            !!refreshResult.data.refreshToken &&
            'success' in refreshResult.data &&
            !!refreshResult.data.success
          ) {
            const data = refreshResult.data as RefreshTokenAPIResponse;
            api.dispatch(setRefreshToken(data.refreshToken));
            api.dispatch(setAccessToken(data.accessToken));

            const updatedHeaders = defaultHeaders(
              new Headers(customHeaders),
              api,
              data.accessToken,
            );
            const updatedArgs = {
              ...enhancedArgs,
              headers: updatedHeaders,
            };

            result = await baseQuery(updatedArgs, api, extraOptions);
          } else {
            try {
              baseQuery(
                {
                  url: URLS.logout,
                  method: METHOD_NAMES.POST,
                  headers: {
                    'X-Bank-UserIp': userIp,
                    'X-Bank-DeviceToken': deviceToken,
                  },
                },
                api,
                {},
              );
            } catch (error) {
              console.warn('Error during logout:', error);
            } finally {
              api.dispatch(setPostponeEasyLogin(false));
              api.dispatch(setAccessToken(''));
              api.dispatch(resetUserProfileInfo());
              if (NavigationRef.current) {
                NavigationRef.current.dispatch(StackActions.replace(GUEST_NAVIGATOR));
              }
            }
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(enhancedArgs, api, extraOptions);
      }
    }
    // handles network error
    if (result.error && result.error.status === 'FETCH_ERROR') {
      const fetchBaseQueryError: FetchBaseQueryError = {
        status: 'FETCH_ERROR',
        data: undefined,
        error: i18next.t('error.network_error'),
      };
      openToast(fetchBaseQueryError.error, 'error');
      return { error: fetchBaseQueryError };
    }
    // handles timeout error --- // TBD // DEA
    if (result.error && result.error.status === 'TIMEOUT_ERROR') {
      const fetchBaseQueryError: FetchBaseQueryError = {
        status: 'TIMEOUT_ERROR',
        data: undefined,
        error: i18next.t('error.timeout_error'),
      };
      openToast(fetchBaseQueryError.error, 'error');
      return { error: fetchBaseQueryError };
    }
    return result;
  } catch (error) {
    console.warn('Error in baseQueryWithInterceptor: ', error);
    const customError: FetchBaseQueryError = {
      status: 'CUSTOM_ERROR',
      data: undefined,
      error: 'Error in baseQueryWithInterceptor',
    };
    return { error: customError };
  }
};
