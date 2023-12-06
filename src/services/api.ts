import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { URLS } from './constants/urls';
import { RootState } from 'store/index';
import { Platform } from 'react-native';
import { METHOD_NAMES } from './constants';

// http://10.213.0.136:4040/swagger/index.html
// https://middleware-tst.terabank.ge/swagger/index.html
// const BASE_URL = 'https://middleware-tst.terabank.ge/';
const BASE_URL = 'http://10.213.0.136:4040/';
// const BASE_URL = 'https://middleware-tst.terabank.ge/';

const mutex = new Mutex();

/**
 *
 * @param headers
 * @returns default headers, that will be used in all API request cycle
 */
const defaultHeaders = (headers: Headers, api: Pick<BaseQueryApi, 'getState'>) => {
  const state = api.getState() as RootState;
  const accessToken = state.userInfo.accessToken;
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

const refreshTokenLogic = async (
  api: BaseQueryApi,
  userIp: string,
  refreshToken: string,
  extraOptions: any,
) => {
  const state = api.getState() as RootState;
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

  if (refreshResult.data) {
    // TODO: Dispatch actions to update tokens in the state
    state.userInfo.accessToken = (refreshResult.data as any).accessToken;
    state.userInfo.refreshToken = (refreshResult.data as any).refreshToken;

    return { success: true };
  } else {
    return { success: false };
  }
};

const logoutLogic = async (api: BaseQueryApi, userIp: string, deviceToken: string) => {
  const state = api.getState() as RootState;
  try {
    state.userInfo.isLoggingOut = true;
    const res = await baseQuery(
      {
        url: URLS.logout,
        method: METHOD_NAMES.POST,
        body: {
          headers: {
            'X-Bank-UserIp': userIp,
            'X-Bank-DeviceToken': deviceToken,
          },
        },
      },
      api,
      {}, // extraOptions if any
    );
    if (res) {
      state.userInfo.postponeEasyLogin = false;
      state.userInfo.isLoggingOut = false;
      state.userInfo.accessToken = '';
      state.userInfo.userProfileInfo = {
        loading: false,
        error: undefined,
        profileInfo: null,
      };
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

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
  let result = await baseQuery(enhancedArgs, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const userIp = state.deviceInfo.userIp || '';
        const deviceToken = state.deviceInfo.deviceToken || '';
        const refreshToken = state.userInfo.refreshToken;

        const { success } = await refreshTokenLogic(api, userIp, refreshToken, extraOptions);

        if (success) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          await logoutLogic(api, userIp, deviceToken);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
