import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import {
  GetTemplatesResponseType,
  GetBankerAPIResponseType,
  DefaultHeadersRequestType,
  BannerDataResponse,
} from './dashboardAPI.types';
import { METHOD_NAMES, URLS } from 'services/constants';
import { TEST_BASE_URL_FOR_BANNERS } from 'constants/TestUrl';

export const dashboardAPI = createApi({
  reducerPath: 'dashboardAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Dashboard'],
  endpoints: builder => ({
    getTemplates: builder.query<GetTemplatesResponseType, DefaultHeadersRequestType>({
      query: ({ headers }) => ({
        url: URLS.getTemplates,
        method: METHOD_NAMES.GET,
        headers: headers,
      }),
    }),
    getBanners: builder.query<BannerDataResponse, any>({
      query: ({ channel, language, page, isCorporate }) => ({
        url: TEST_BASE_URL_FOR_BANNERS,
        method: METHOD_NAMES.GET,
        params: { channel, language, page, isCorporate },
      }),
    }),
    getBanker: builder.query<GetBankerAPIResponseType, void>({
      query: () => ({
        url: URLS.getBankerInfo,
        method: METHOD_NAMES.GET,
      }),
    }),
  }),
});

export const { useGetTemplatesQuery, useGetBankerQuery, useGetBannersQuery } = dashboardAPI;
