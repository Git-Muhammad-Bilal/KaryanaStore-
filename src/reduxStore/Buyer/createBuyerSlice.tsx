import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Buyer } from './types/buyertypes';
import { localStorageTypes } from '../../axios/axiosApi';


interface responseTypes {
    
    message: string
    data:{
        accessToken: string
        buyerOrstore:string
    }
}

const transformResponseFunc = () => {
        return (response: responseTypes) => {
        console.log(response,'response');
        
        if (response) {
            localStorage.setItem('accessToken', JSON.stringify(response)) ;
          
        }
       return response;

    }
}

export const createBuyerSlice = createApi({
    reducerPath: 'createBuyerSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3003',
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


