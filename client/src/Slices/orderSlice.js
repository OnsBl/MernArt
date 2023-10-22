
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    orders: [],
    loading: false,
    success: false,
    error: null,
    message: "",
    totalRecords: 0

}


export const getOrders = createAsyncThunk('orders/getorders', async (buyer, thunkApi) => {
    try {
        
      const { data } = await axios.get(`http://localhost:8000/api/getorders/${buyer.buyer}`);
  
      if (data) {
        return data;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  });




export const addOrder = createAsyncThunk('Orders/addOrder', async (order, thunkApi) => {


    try {
        console.log('hi2',order)
        // response.data
        const { data } = await axios.post('http://localhost:8000/api/addOrder', order)
        console.log('data',data)
        if (data)
            return data


    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }

})



export const OrderSlice = createSlice({
    name: "Orders",
    initialState,
    reducers: {

        reset: (state) => {
            state.loading = false
            state.success = false
            state.error = null
            state.message = ""
        }
        //redux thunk 


    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.success = true
            state.message = "order getted"
            state.orders = action.payload
            state.totalRecords = action.payload.totalRecords
        }).addCase(getOrders.rejected, (state, action) => {

            state.error = action.payload
            state.message = "getting orders failed"
        }).addCase(getOrders.pending, (state, action) => {
            state.loading = true
            state.message = "getting orders pending"
        }).addCase(addOrder.fulfilled, (state, action) => {
            state.success = true
            state.message = "order added"
            state.orders.push(action.payload.order)

        }).addCase(addOrder.rejected, (state, action) => {

            state.error = action.payload
            state.message = "adding orders failed"
        }).addCase(addOrder.pending, (state, action) => {
            state.loading = true
            state.message = "adding orders pending"
        })
    }
})


export const { reset } = OrderSlice.actions
export default OrderSlice.reducer

