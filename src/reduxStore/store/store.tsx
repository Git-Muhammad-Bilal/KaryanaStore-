import { configureStore } from "@reduxjs/toolkit";
import { fetchProductSlice } from "../karyanaStore/productsSlice";
import { purchaesSlice } from "../karyanaStore/purchaseSlice";
import {fetchStoresSlice} from "../Buyer/fetchStoresSlice";
import { createBuyerSlice } from "../Buyer/createBuyerSlice";
import {getSalesNotifications} from "../karyanaStore/saleNotificationSlice";
import  cartProductSlice  from "../Buyer/AddToCartSlice";
import BuyerNameSlice from "../Buyer/BuyerNameSlice";


 let store  = configureStore({
    reducer:{
        
        cartProduct:cartProductSlice,
        getBuyerName:BuyerNameSlice,
        [createBuyerSlice.reducerPath]: createBuyerSlice.reducer,
        [fetchProductSlice.reducerPath]: fetchProductSlice.reducer,
        [purchaesSlice.reducerPath]: purchaesSlice.reducer,
        [fetchStoresSlice.reducerPath]: fetchStoresSlice.reducer,
        [getSalesNotifications.reducerPath]:getSalesNotifications.reducer
       
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( 
        fetchProductSlice.middleware,
        purchaesSlice.middleware,
        fetchStoresSlice.middleware,
        createBuyerSlice.middleware,
        getSalesNotifications.middleware,
        ),


})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;