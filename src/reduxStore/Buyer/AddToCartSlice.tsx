import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./types/storeInfoTypes";
import { inputProducttypes, productsTypes } from "../../componants/store/storeTypes";

export interface cartProdTypes {
    cartProduct:inputProducttypes[]
 }


const initialState:cartProdTypes = {
    cartProduct:[]
        
     
}


const cartProductSlice = createSlice({
    name: 'cartProductSlice',
    initialState,
    reducers: {
        extractProductInfo: (state:cartProdTypes, action: PayloadAction<inputProducttypes>) => {
              state.cartProduct.push(action.payload);
              },
          cancealCartItem: (state:cartProdTypes, action: PayloadAction<inputProducttypes>) => {
            console.log(state.cartProduct.length,'state', action.payload, 'action');
                state.cartProduct = state.cartProduct.filter((p)=>p._id !== action.payload._id)
                return state
          },
    }

   
})
 


export const { extractProductInfo , cancealCartItem} = cartProductSlice.actions
export default cartProductSlice.reducer;
