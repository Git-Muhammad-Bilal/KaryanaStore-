import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let token = localStorage.getItem('accessToken');
export const purchaesSlice = createApi({
    reducerPath: 'purchaesSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3003',
        prepareHeaders: (Headers) => {
            Headers.set('token', token || '')
            return Headers
        }

    }),
    keepUnusedDataFor: 10,

    tagTypes: ['Purchases'],
    endpoints: (builder) => ({
        getPurchases: builder.query(
            {
                query: (productId) => `/getPurchases/${productId}`,
                providesTags: ['Purchases']
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
            invalidatesTags: ['Purchases']
        })

    })
})

export const {
    useGetPurchasesQuery,
    useCreatePurchaseMutation,
    useDeletePurchaseMutation
} = purchaesSlice


