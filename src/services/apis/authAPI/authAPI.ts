import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import {
  AddTrustedDeviceAPIRequestType,
  AddTrustedDeviceAPIResponseType,
  GetTrustedDevicesAPIRequestType,
  GetTrustedDevicesAPIResponseType,
  GetUserInfoAPIResponseType,
  LoginAPIRequestType,
  LoginAPIResponseType,
  LoginByRefreshTokenAPIRequestType,
  LoginByRefreshTokenAPIResponseType,
  LogoutAPIRequestType,
  LogoutAPIResponseType,
} from './authAPI.types';
import { URLS } from 'services/constants/urls';
import { METHOD_NAMES } from 'services/constants';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    loginUser: builder.mutation<LoginAPIResponseType, LoginAPIRequestType>({
      query: credentials => ({
        url: URLS.login,
        method: METHOD_NAMES.POST,
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation<LogoutAPIResponseType, LogoutAPIRequestType>({
      query: body => ({
        url: URLS.logout,
        method: METHOD_NAMES.POST,
        body: body,
      }),
    }),
    // TODO - make a mutation, not query
    getTrustedDevices: builder.query<
      GetTrustedDevicesAPIResponseType,
      GetTrustedDevicesAPIRequestType
    >({
      query: body => ({
        url: URLS.getTrustedDevices,
        method: METHOD_NAMES.POST,
        body: body,
      }),
    }),
    addTrustedDevice: builder.mutation<
      AddTrustedDeviceAPIResponseType,
      AddTrustedDeviceAPIRequestType
    >({
      query: body => ({
        url: URLS.addTrustedDevice,
        method: METHOD_NAMES.POST,
        body: body,
      }),
    }),
    getUserProfileInfo: builder.query<GetUserInfoAPIResponseType, void>({
      query: () => ({
        url: URLS.getUserProfile,
        method: METHOD_NAMES.GET,
      }),
    }),
    loginByRefreshToken: builder.mutation<
      LoginByRefreshTokenAPIResponseType,
      LoginByRefreshTokenAPIRequestType
    >({
      query: credentials => ({
        url: URLS.loginByRefreshToken,
        method: METHOD_NAMES.POST,
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useAddTrustedDeviceMutation,
  useGetTrustedDevicesQuery,
  useLazyGetTrustedDevicesQuery,
  useLogoutUserMutation,
  useGetUserProfileInfoQuery,
  useLazyGetUserProfileInfoQuery,
  useLoginByRefreshTokenMutation,
} = authAPI;
