import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const user= JSON.parse(localStorage.getItem('user'))
const initialState={
    user: user?user:null,
    loading:false,
    success:false,
    error:null,
    message:"",
}

export const register=createAsyncThunk('auth/register',async(data,thunkApi)=>{

    try {
        const response = await axios.post(`http://localhost:8000/api/register`,data)

    if(response.data) 
     { localStorage.setItem('user',JSON.stringify(response.data.user))
        return response.data.user}
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }

})
export const login=createAsyncThunk('auth/login',async(data,thunkApi)=>{

    try {
        const response = await axios.post(`http://localhost:8000/api/login`,data)

    if(response.data) 
     { localStorage.setItem('user',JSON.stringify(response.data.user))
        return response.data.user}
    } catch (error) {
        
        return thunkApi.rejectWithValue(error.response.data)
    }

})
export const logout=createAsyncThunk('auth/logout',async(data,thunkApi)=>{

    localStorage.removeItem('user')
    return null
})

export const AuthSlice=createSlice({

    name:"auth",
    initialState:initialState,
    userRole: null,
    
    reducers:{

        reset:(state)=>{
            state.loading=false
            state.success=false
            state.error=null
            state.message=""
        }
    }
    //redux thunk 
    , extraReducers:(builder)=>{
        builder.addCase(register.pending,(state,action)=>{
            state.loading=true
            state.message="pending sending data"
        }).addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.message="user created succesfully"
            state.success=true
             state.user = action.payload
        }).addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.message="user rejected successfully"
            state.success=false
            state.error=action.payload
           
        }).addCase(logout.fulfilled,(state,action)=>{
              state.message="logout success"
              state.user=null
        }).addCase(login.pending,(state,action)=>{
            state.loading=true
            state.message="pending sending data"
        }).addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.message="user login succesfully"
            state.success=true
             state.user = action.payload
        }).addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.message="user rejected successfully"
            state.success=false
            state.error=action.payload
           
        })
    }

    
 }

)

export const {reset}=AuthSlice.actions
export default AuthSlice.reducer