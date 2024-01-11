import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import {
  GetTotalSavingRequestType,
  GetTotalSavingResponseType,
  GetUnreadNotificationsCountRequestType,
  GetUnreadNotificationsCountResponseType,
  GetUserInfoAPIResponseType,
} from './profileAPI.types';

import { METHOD_NAMES, URLS } from 'services/constants';

export const profileAPI = createApi({
  reducerPath: 'profileAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Profile'],
  endpoints: builder => ({
    getUserProfileInfo: builder.query<GetUserInfoAPIResponseType, void>({
      query: () => ({
        url: URLS.getUserProfile,
        method: METHOD_NAMES.GET,
      }),
    }),
    getUnreadMessagesCount: builder.query<any, void>({
      query: () => ({
        url: URLS.getUnreadMessagesCount,
        method: METHOD_NAMES.GET,
      }),
    }),
    getTotalSaving: builder.mutation<GetTotalSavingResponseType, GetTotalSavingRequestType>({
      query: credentials => ({
        url: URLS.getTotalSaving,
        method: METHOD_NAMES.POST,
        body: credentials,
      }),
    }),
    getUnreadNotificationsCount: builder.mutation<
      GetUnreadNotificationsCountResponseType,
      GetUnreadNotificationsCountRequestType
    >({
      query: credentials => ({
        url: URLS.getUnreadNotificationsCount,
        method: METHOD_NAMES.POST,
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetUserProfileInfoQuery,
  useLazyGetUserProfileInfoQuery,
  useGetTotalSavingMutation,
  useGetUnreadMessagesCountQuery,
  useLazyGetUnreadMessagesCountQuery,
  useGetUnreadNotificationsCountMutation,
} = profileAPI;
