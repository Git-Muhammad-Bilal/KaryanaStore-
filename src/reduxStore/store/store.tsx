import { configureStore } from "@reduxjs/toolkit";
import { fetchProductSlice } from "../karyanaStore/productsSlice";
import { purchaesSlice } from "../karyanaStore/purchaseSlice";
import {fetchStoresSlice} from "../Buyer/fetchStoresSlice";
import { createBuyerSlice } from "../Buyer/createBuyerSlice";
import  cartProductSlice  from "../Buyer/AddToCartSlice";
import {getSalesNotifications} from "../karyanaStore/saleNotificationSlice";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";

export let store = configureStore({
    reducer:{
        cartProduct:cartProductSlice,
        [createBuyerSlice.reducerPath]: createBuyerSlice.reducer,
        [fetchProductSlice.reducerPath]: fetchProductSlice.reducer,
        [purchaesSlice.reducerPath]: purchaesSlice.reducer,
        [fetchStoresSlice.reducerPath]: fetchStoresSlice.reducer,
        [getSalesNotifications.reducerPath]:getSalesNotifications.reducer
        // [createBuyerSlice.reducerPath]: createBuyerSlice.reducer,
        // [createBuyerSlice.reducerPath]: createBuyerSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( 
        fetchProductSlice.middleware,
        purchaesSlice.middleware,
        fetchStoresSlice.middleware,
        createBuyerSlice.middleware,
        getSalesNotifications.middleware,
        ),


})


// setupListeners(store.dispatch)


