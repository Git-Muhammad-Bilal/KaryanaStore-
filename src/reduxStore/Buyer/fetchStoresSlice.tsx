import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from './types/storeInfoTypes';
import { localStorageTypes } from '../../axios/axiosApi';

let token:any = localStorage.getItem('accessToken');
let strg: localStorageTypes = JSON.parse(token);

export const fetchStoresSlice = createApi({
    reducerPath: 'fetchStoresSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3003',
        prepareHeaders: (Headers) => {
            Headers.set('token', strg?.accessToken || '')
            return Headers
        }

    }),
    keepUnusedDataFor: 0,

    tagTypes: ['stores'],
    endpoints: (builder) =>({
        getStores: builder.query<store[], number>(
            {
                query: () => `/getStores`,
                providesTags:['stores'],
                keepUnusedDataFor:0,
            }),

                     

    })
})

export const {
    useGetStoresQuery,
} = fetchStoresSlice


