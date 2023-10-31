import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit' 
import axiosApi from '../../axios/axiosApi'
// const { data } = await axiosApi.get('/buyerName')


export const fetchBuyerName = createAsyncThunk('BuyerNameSlice/Name',async () => {
    console.log('data');
    
        try {
            const { data } = await axiosApi.get(`/buyerName`)
            return data
            
        } catch (err) {
            throw err
            
        }
    }
)

interface BuyerNameTypes {
    BuyerName: string,
    error:null | string,
    loading:boolean;
}
const initialState: BuyerNameTypes = {
       BuyerName: '',
       error: null,
       loading: false,
}

const BuyerNameSlice =createSlice({
    name: 'BuyerNameSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBuyerName.pending, (state:BuyerNameTypes) => {
            
            state.loading = true
        })

        builder.addCase(fetchBuyerName.fulfilled, (state:BuyerNameTypes, action:PayloadAction<BuyerNameTypes>) => {
            
            state.BuyerName = action.payload.BuyerName;
            state.loading = false;
            state.error = null;
        })
        
        builder.addCase(fetchBuyerName.rejected, (state:BuyerNameTypes, action) => {
            state.loading = false;
            state.BuyerName = '';
            state.error = 'Could not fetch buyerName'
        })
    }
})


    
export default BuyerNameSlice.reducer;





