import Image from "next/image"

export default function Product({img, name, price, onBuy}){
    return(
        <div className="product">
            <Image src={img} width='300' height='200' alt={name} />
            <h3>{name}</h3>
            <div className="price">{price} UAH</div>
            <button className="buy" onClick={onBuy}>Add to Cart</button>
        </div>
    )
}