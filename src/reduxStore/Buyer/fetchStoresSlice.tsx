import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from './types/storeInfoTypes';

let token = localStorage.getItem('accessToken');

export const fetchStoresSlice = createApi({
    reducerPath: 'fetchStoresSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3003',
        prepareHeaders: (Headers) => {
            Headers.set('token', token || '')
            return Headers
        }

    }),
    // keepUnusedDataFor: 10,

    tagTypes: ['stores'],
    endpoints: (builder) =>({
        getStores: builder.query<store[], number>(
            {
                query: () => `/getStores`,
                providesTags:['stores']
            }),

       

    })
})

export const {
    useGetStoresQuery,
} = fetchStoresSlice


