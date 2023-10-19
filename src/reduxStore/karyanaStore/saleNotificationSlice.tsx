
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

let token = localStorage?.getItem('accessToken');
export interface salesNotifiTypes{
    notfiedPurchases:{
        purchaseCount:Number,
        productId:string,
    }
    _id:string
}

export const getSalesNotifications = createApi({
   reducerPath:'getOrderedProducts',
   baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:3003',
      prepareHeaders:(Headers)=>{
         Headers.set('token', token || '')
         return Headers
      }

   }),
   keepUnusedDataFor: 0,
   
   
   tagTypes:['notifications'],
         endpoints:(builder)=>({
             getSalNotficaions:builder.query<salesNotifiTypes[], string>(
               {query: (productId)=> `/getSalesNotificaions/${productId}`,
               providesTags: (result, error, arg) =>
               result
                 ? [...result.map(({ _id }) => ({ type: 'notifications' as const, _id })), 'notifications']
                 : ['notifications'],
                 keepUnusedDataFor: 0
            }),

         
           
         })
      })
         
   export const {
      useLazyGetSalNotficaionsQuery, 
     } = getSalesNotifications

      
      // export const fetchProducts = createAsyncThunk('products/fetchProducts',
//     async () => {
//         try {
//             const { data } = await axiosApi.get(`/getProducts`)
//             return data

//         } catch (err) {
//             throw err
//         }
//     }
// )


// const initialState = {
//     products: [],
//     error: null,
//     loading: false,

// }

// const productSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchProducts.pending, (state, action) => {
//             state.loading = true
//         })
//         builder.addCase(fetchProducts.fulfilled, (state, action) => {
            
//             state.products = action.payload;
//             state.loading = false;
//             state.error = null;
//         })
//         builder.addCase(fetchProducts.rejected, (state, action) => {
//             state.loading = false;
//             state.products = [];
//             state.error = action.error.message
//         })
//     }
// })

// export default productSlice.reducer;



















// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// // import { store } from "./types/storeInfoTypes";
// import { inputProducttypes, productsTypes } from "../../componants/store/storeTypes";

// export interface cartProdTypes {
//     OrderedProduct:inputProducttypes[]
//  }


// const initialState:cartProdTypes = {
//     OrderedProduct:[]
// }


// const orderedProductSlice = createSlice({
//     name: 'orderedProductSlice',
//     initialState,
//     reducers: {
//          getOrderedProducts: (state:cartProdTypes, action: PayloadAction<inputProducttypes[]>) => {
//                console.log(action.payload, 'payload');
//               let result =  action.payload.map((p:any)=>{
//                              return p._id 
//                })
//                state.OrderedProduct = result;
//                return state 
//             },
//           }

   
// })
 


// export const { getOrderedProducts } =  orderedProductSlice.actions
// export default  orderedProductSlice.reducer;