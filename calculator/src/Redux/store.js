import { configureStore } from '@reduxjs/toolkit'
import CalculateSlice from './CalculateSlice'

 const store = configureStore({
  reducer: {
    Calculate:CalculateSlice,
  },
})



export default store