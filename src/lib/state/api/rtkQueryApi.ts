import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkQueryApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({ }),
});


export const {  } = rtkQueryApi;
