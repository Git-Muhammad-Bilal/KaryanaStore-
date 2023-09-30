import { configureStore } from "@reduxjs/toolkit";
import { fetchProductSlice } from "../karyanaStore/productsSlice";
import { purchaesSlice } from "../karyanaStore/purchaseSlice";
import {fetchStoresSlice} from "../Buyer/fetchStoresSlice";
import { createBuyerSlice } from "../Buyer/createBuyerSlice";
import  cartProductSlice  from "../Buyer/AddToCartSlice";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";

export let store = configureStore({
    reducer:{
        cartProduct:cartProductSlice,
        [fetchProductSlice.reducerPath]: fetchProductSlice.reducer,
        [purchaesSlice.reducerPath]: purchaesSlice.reducer,
        [fetchStoresSlice.reducerPath]: fetchStoresSlice.reducer,
        [createBuyerSlice.reducerPath]: createBuyerSlice.reducer,
        [createBuyerSlice.reducerPath]: createBuyerSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( 
        fetchProductSlice.middleware,
        purchaesSlice.middleware,
        fetchStoresSlice.middleware,
        createBuyerSlice.middleware,
        ),


})


// setupListeners(store.dispatch)


