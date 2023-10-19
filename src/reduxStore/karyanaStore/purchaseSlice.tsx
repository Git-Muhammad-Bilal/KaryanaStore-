import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let token = localStorage.getItem('accessToken');
console.log(token, 'buyersssss');

export const purchaesSlice = createApi({
    reducerPath: 'purchaesSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3003',
        prepareHeaders: (Headers) => {
            Headers.set('token', token || '')
            return Headers
        }

    }),
    keepUnusedDataFor: 0,
    
    tagTypes: ['Purchases'],
    endpoints: (builder) => ({
        getPurchases: builder.query(
            {
                query: (productId) => `/getPurchases/${productId}`,
                providesTags: ['Purchases'],
                keepUnusedDataFor: 0
            }),
            
            createPurchase: builder.mutation({
            query: (product) => ({
                url: '/createPurchase',
                method: 'post',
                body: { ...product }
            }),
            invalidatesTags: ['Purchases']
        }),
        deletePurchase: builder.mutation({
            query: (purchaseId) => ({
                url: `/deletePurchaseFromAproduct/${purchaseId}`,
                method: 'delete',
            }),
            invalidatesTags: ['Purchases'],
            
        })

    })
})

export const {
    useLazyGetPurchasesQuery,
    useCreatePurchaseMutation,
    useDeletePurchaseMutation
} = purchaesSlice


