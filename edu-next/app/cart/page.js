'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import ProductCart from '../components/product_cart';
import { delProduct, changeCount } from "@/lib/shopSlice";

export default function Cart() {
  const dispatch = useAppDispatch();

  const selectState = state => state.cart;
  const cart = useAppSelector(selectState);

    return (
    <main >
      <h1>Cart</h1>

      <div className="cart_content">
      {
        cart.length > 0 ? 

        cart.map( (item, index) =>
          <ProductCart key={index} count={item.count} name={item.name} price={item.price}  img={item.img}
                      onIncrement={()=>dispatch(changeCount({id: item.id, delta: 1}))} 
                      onDecrement={()=>dispatch(changeCount({id: item.id, delta: -1}))} 
                      onDelete={()=>dispatch(delProduct(item.id))}  />
          )

          : <h3>Cart is empty</h3>
      }
      </div>
      {/* <div className="cart_summary">
        <div className='cart_info_row'>
          Total: {state.total} USD
        </div>
        <div className='cart_info_row'>
          Items ordered: {state.count} item(s)
        </div>
      </div> */}
    </main>
  )
}
