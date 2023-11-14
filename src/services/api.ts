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
  headers.set('User-Agent', 'terabank');
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
  const { refreshToken } = state.userInfo;
  let customHeaders: Record<string, string> = {};

  // We can pass custom headers, depending on a specific API request, just like this: {headerKey: "headerValue"}
  if (typeof args !== 'string') {
    // console.log('addTrustedDevice', args);
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
        const refreshResult = await baseQuery(
          {
            method: 'POST',
            url: URLS.refreshToken,
            body: { refreshToken },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          // save access and refresh tokens here - TODO
          //   const state = api.getState() as RootState;
          //   state.userInfo.accessToken = refreshResult.data.accessToken;
          //   state.userInfo.refreshToken = refreshResult.data.refreshToken;
          result = await baseQuery(args, api, extraOptions);
        } else {
          // log out here
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
