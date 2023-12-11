import { createSlice } from "@reduxjs/toolkit"

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
      cart: [],
      count: 0,
      total: 0
    },
    reducers: {
      addToCart: (state, action) => {
        state.cart.push(action.payload);
        state.count += 1;
        state.total += +action.payload.price;
      },
    }
  })
  
  export const { addToCart } = shopSlice.actions
  