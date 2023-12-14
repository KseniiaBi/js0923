import Image from "next/image"

export default function ProductCart({img, id, name, price, onDelete, onIncrement, onDecrement, count}){
    return(
        <div className="product_cart">
            <Image src={img} width='300' height='200' alt={name} />
            <h3>{name}</h3>
            <div className="item_counter">
                <button onClick={onDecrement}>-</button>
                <span className="item_count">{count}</span>
                <button onClick={onIncrement}>+</button>
            </div>
            <div className="price">{price} USD</div>
            <button className="deleteItem" onClick={()=>onDelete(id)}>Delete Item</button>
            <span className="item_total">{price * count}</span>
        </div>
    )
}