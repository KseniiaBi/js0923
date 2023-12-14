import { createSlice } from "@reduxjs/toolkit"
import { products } from "@/app/components/data";

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
      cart: [],
      count: 0,
      total: 0
    },
    reducers: {
      addToCart: (state, action) => {
        const prod = action.payload;
        let wasInCart = false;
        if(state.cart.length > 0){
            state.cart.forEach(item => {
                if(item.id === prod.id){
                    item.count += 1;
                    wasInCart = true;
                }
            });
        }
        if(!wasInCart){
            state.cart.push({...prod, count: 1});
        }   
        
        state.count += 1;
        state.total += prod.price;
      },
      changeCount: (state, action) => {
        const delta = action.payload.delta;
        const id = action.payload.id;

        state.cart.forEach((item, index) => {
            if(item.id === id){
                state.total += delta * item.price;
                state.count += delta;
                if(item.count + delta > 0){
                    item.count += delta;
                }
                else{
                    state.cart.splice(index, 1);  
                }
            }
        })

      },
      delProduct: (state, action) => {
        const id = action.payload;

        state.cart.forEach((item,index)=>{
            if(item.id === id){
                state.total -= item.price * item.count;
                state.count -= item.count;
                state.cart.splice(index, 1);
            }
        });
      }
    }
  })
  
  export const { addToCart, delProduct, changeCount } = shopSlice.actions
  