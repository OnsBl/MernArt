
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    works: [],
    loading: false,
    success: false,
    error: null,
    message: "",
    totalRecords: 0


}


export const getWorks = createAsyncThunk('works/getworks', async (userid, thunkApi) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/getworks/${userid.userid}`);
  
      if (data) {
        return data;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  });
export const getWorksAll = createAsyncThunk('Works/getworksall', async (userid, thunkApi) => {


    try {
        console.log('mytoken',JSON.parse(localStorage.getItem('user')))
       
        // response.data
        const { data } = await axios.get(`http://localhost:8000/api/getworksall/${userid.userid}`);
        console.log('dataall',data)
        if (data)
            return data


    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }

})

export const updateWork = createAsyncThunk('Works/updatework', async (work, thunkApi) => {


    try {

        // response.data
        const { data } = await axios.post('http://localhost:8000/api/updatework', work)
        if (data)
            return data


    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }

})

export const addWork = createAsyncThunk('Works/addWork', async (work, thunkApi) => {


    try {
        console.log('hi2',work)
        // response.data
        const { data } = await axios.post('http://localhost:8000/api/addWork', work)
        console.log('data',data)
        if (data)
            return data


    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }

})
export const deleteWork = createAsyncThunk('AdminWorks/deleteWork', async (_id, thunkApi) => {
    try {
        console.log('Deleting work with _id:', _id);

        const { data } = await axios.post('http://localhost:8000/api/deleteWork', _id);
        console.log('Delete response:', data);

        if (data) {
            return data;
        }
    } catch (error) {
        console.error('Error deleting work:', error);
        return thunkApi.rejectWithValue(error.response.data);
    }
});


export const WorkSlice = createSlice({
    name: "Works",
    initialState,
    reducers: {

        reset: (state) => {
            state.loading = false
            state.success = false
            state.error = null
            state.message = ""
        }
     


    },
    extraReducers: (builder) => {
        builder.addCase(getWorks.fulfilled, (state, action) => {
            state.success = true
            state.message = "work getted"
            state.works = action.payload
            state.totalRecords = action.payload.totalRecords
        }).addCase(getWorks.rejected, (state, action) => {

            state.error = action.payload
            state.message = "getting works failed"
        }).addCase(getWorks.pending, (state, action) => {
            state.loading = true
            state.message = "getting works pending"
        }).addCase(addWork.fulfilled, (state, action) => {
            state.success = true
            state.message = "work added"
            state.works.push(action.payload.work)

        }).addCase(addWork.rejected, (state, action) => {

            state.error = action.payload
            state.message = "adding works failed"
        }).addCase(addWork.pending, (state, action) => {
            state.loading = true
            state.message = "adding works pending"
        }).addCase(updateWork.fulfilled, (state, action) => {
            state.success = true;
            state.message = "work update";
            console.log(action.payload);
    
            const updatedWork = action.payload.work;
            state.works = state.works.map((work) =>
              work.id === updatedWork.id ? updatedWork : work
            );
          
        }).addCase(updateWork.rejected, (state, action) => {

            state.error = action.payload
            state.message = "update works failed"
        }).addCase(updateWork.pending, (state, action) => {
            state.loading = true
            state.message = "update works pending"
        }).addCase(deleteWork.fulfilled, (state, action) => {
            state.success = true
            state.message = "work deleted"
            state.works = state.works.filter(work => work._id !== action.payload.work._id);
        }).addCase(deleteWork.rejected, (state, action) => {

            state.error = action.payload
            state.message = "deleting works failed"
        }).addCase(deleteWork.pending, (state, action) => {
            state.loading = true
            state.message = "deleting works pending"
        }).addCase(getWorksAll.fulfilled, (state, action) => {
            state.success = true
            state.message = "work getted"
            state.works = action.payload

        }).addCase(getWorksAll.rejected, (state, action) => {

            state.error = action.payload
            state.message = "getting works failed"
        }).addCase(getWorksAll.pending, (state, action) => {
            state.loading = true
            state.message = "getting works pending"
        })
    }
})


export const { reset } = WorkSlice.actions
export default WorkSlice.reducer

