import { configureStore } from '@reduxjs/toolkit'
import { shopSlice } from './shopSlice';

export const makeStore = () => {
    return configureStore({
        reducer: shopSlice.reducer
    })
};
  