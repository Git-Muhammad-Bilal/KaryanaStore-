import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { inputProducttypes } from '../../componants/store/storeTypes';

let token = localStorage?.getItem('accessToken');


export const fetchProductSlice = createApi({
   reducerPath:'fetchProductSlice',
   baseQuery:fetchBaseQuery({
      baseUrl:'http://localhost:3003',
      prepareHeaders:(Headers)=>{
         Headers.set('token', token || '')
         return Headers
      }

   }),
   keepUnusedDataFor: 30,
   
   tagTypes:['Products'],
         endpoints:(builder)=>({
             getProducts:builder.query<inputProducttypes[], string | undefined>(
               {query: (storeId)=>storeId?.length? `/getProducts/${storeId}`:'/getProducts',
               providesTags:['Products']
            }),

             createOrUpdateProduct:builder.mutation({
               query: (product)=>({
                  url: '/createOrUpdate',
                  method:'post',
                  body:{...product}
               }),
               invalidatesTags: ['Products']
            }),
             deleteProduct:builder.mutation({
               query: (id)=>({
                  url:`/deleteProduct/${id}`,
                  method:'delete',
               }),
               invalidatesTags: ['Products']
            })
           
         })
      })
         
   export const {
      useGetProductsQuery, 
      useCreateOrUpdateProductMutation, 
      useDeleteProductMutation
     } = fetchProductSlice
      
      
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
