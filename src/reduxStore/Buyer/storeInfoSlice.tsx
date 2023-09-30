import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./types/storeInfoTypes";

 interface storeInfoType {
    storeInfo:store[]
 }


const initialState:storeInfoType = {
     storeInfo:[]
        
     
}

const productSlice = createSlice({
    name: 'storeInfo',
    initialState,
    reducers: {
        extractStoreInfo: (state, action: PayloadAction<store>) => {
            // console.log(state,'state', action.payload, 'action');
             state.storeInfo = [action.payload]
             
              
          },
    }

   
})
 


export const { extractStoreInfo } = productSlice.actions
export default productSlice.reducer;
