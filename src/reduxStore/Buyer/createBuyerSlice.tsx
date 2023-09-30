import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from './types/storeInfoTypes';
import { Buyer } from './types/buyertypes';
import { Method } from 'axios';
import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

let token = localStorage.getItem('accessToken');

interface responseTypes {
    accessToken: string
    message: string
}

const transformResponseFunc = () => {
    return (response: responseTypes) => {
        console.log(response, 'response');

        if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
        }


        return response;

    }
}

export const createBuyerSlice = createApi({
    reducerPath: 'createBuyerSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3003',
        prepareHeaders: (Headers) => {
            Headers.set('token', token || '')
            return Headers
        }

    }),

    tagTypes: ['buyer'],
    endpoints: (builder) => ({
        createBuyerAccount: builder.mutation(
            {
                query: (buyer: Buyer) => ({  url: '/createBuyer',method: 'post',body: { ...buyer },}),
                transformResponse: transformResponseFunc()

            }),
        loginBuyer: builder.mutation(
            {
                query: (buyer) => ({
                    url: '/loginBuyer',
                    method: 'post',
                    body: { ...buyer },
                }),
                transformResponse: transformResponseFunc()

            }),




    })
})

export const {
    useCreateBuyerAccountMutation,
    useLoginBuyerMutation,
} = createBuyerSlice


