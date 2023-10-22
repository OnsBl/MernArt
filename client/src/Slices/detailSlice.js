
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    detail: {},
   
}


export const detailSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {

        showDetail: (state, action) => {
            state.detail = action.payload;
            
        
          }

    },
   
    
})

export const { showDetail } = detailSlice.actions
export default detailSlice.reducer

