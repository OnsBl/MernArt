

import { configureStore } from '@reduxjs/toolkit'

import workReducer from './Slices/WorkSlice'
import UserReducer from './Slices/AuthSlice'
import detailReducer from './Slices/detailSlice'
import orderReducer from './Slices/orderSlice'
const store =configureStore({
    reducer:{
        workReducer:workReducer,
        detailReducer:detailReducer,
        userReducer:UserReducer,
        orderReducer:orderReducer

    }
})

export default store