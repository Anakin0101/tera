import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';

import { METHOD_NAMES, URLS } from 'services/constants';
import { getSecuredFileByIdRequestType } from './filesAPI.types';

export const filesAPI = createApi({
  reducerPath: 'filesAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Files'],
  endpoints: builder => ({
    getSecuredFileById: builder.query<any, getSecuredFileByIdRequestType>({
      query: ({ headers, fileId }) => ({
        url: URLS.getSecuredFileById,
        method: METHOD_NAMES.GET,
        headers: headers,
        params: {
          FileId: fileId,
        },
      }),
    }),
  }),
});

export const { useGetSecuredFileByIdQuery, useLazyGetSecuredFileByIdQuery } = filesAPI;
