import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import {
  AddTrustedDeviceAPIRequestType,
  AddTrustedDeviceAPIResponseType,
  DeleteTrustedDeviceAPIRequestType,
  DeleteTrustedDeviceAPIResponseType,
  GetTrustedDevicesAPIRequestType,
  GetTrustedDevicesAPIResponseType,
  LoginAPIRequestType,
  LoginAPIResponseType,
  LoginByRefreshTokenAPIRequestType,
  LoginByRefreshTokenAPIResponseType,
  LogoutAPIRequestType,
  LogoutAPIResponseType,
  RegisterUserAPIRequestType,
  RegisterUserAPIResponseType,
} from './authAPI.types';

import { METHOD_NAMES, URLS } from 'services/constants';

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
      query: ({ headers, body }) => ({
        url: URLS.addTrustedDevice,
        method: METHOD_NAMES.POST,
        headers: headers,
        body: body,
      }),
    }),
    deleteTrustedDevices: builder.mutation<
      DeleteTrustedDeviceAPIResponseType,
      DeleteTrustedDeviceAPIRequestType
    >({
      query: body => ({
        url: URLS.deleteTrustedDevices,
        method: METHOD_NAMES.POST,
        body: body,
      }),
    }),
    registerUser: builder.mutation<RegisterUserAPIResponseType, RegisterUserAPIRequestType>({
      query: ({ headers, body }) => ({
        url: URLS.registerUser,
        method: METHOD_NAMES.POST,
        headers: headers,
        body: body,
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
  useLoginByRefreshTokenMutation,
  useDeleteTrustedDevicesMutation,
  useRegisterUserMutation,
} = authAPI;
