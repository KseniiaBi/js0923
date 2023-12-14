'use client'

import { addToCart } from "@/lib/shopSlice";
import Product from "../components/product";
import { useAppDispatch, useAppStore } from "@/lib/hooks";
import { products } from "../components/data";

export default function Shop() {
  const dispatch = useAppDispatch();
  const store = useAppStore();

    return (
        <main >
          <h1>Shop</h1>

          <div className="shop">
            {
              products.map((item,index) => <Product key={index} name={item.name} 
                                                    onBuy={()=>dispatch(addToCart(item)) } 
                                                    price={item.price} img={item.img} />)
            }
          </div>
        </main>
  )
}

