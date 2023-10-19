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
          cancealCartItem: (state:cartProdTypes , action: PayloadAction<string[]> ) => {
                state.cartProduct = state.cartProduct.filter((p)=> action.payload.includes(p._id.toString()))
                
                return state
          },
    }

   
})
 


export const { extractProductInfo , cancealCartItem} = cartProductSlice.actions
export default cartProductSlice.reducer;
