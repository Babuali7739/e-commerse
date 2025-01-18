import React, { useContext,useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext';


export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);

    const [selectedSize, setSelectedSize] = useState(null); // State to track selected size

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image}  alt="" />
                <img src={product.image}  alt="" />
                <img src={product.image}  alt="" />
            </div>
            <div className="productdisplay-img">
                <img className ='productdisplay-main-img'src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(12343)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">
                    ${product.old_price}
                </div>
                <div className="productdisplay-right-price-new">
                    ${product.new_price}
                </div>
            </div>
            <div className="productdisplay-right-description">
                A lightweight,usually knitted,pullovershirt,close-fitting and with around necklline and short sleeves,
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeClick(size)}
                            >
                                {size}
                            </div>
                        ))}
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category :</span>  {product.category}</p>
            <p className='productdisplay-right-category'><span>Tags :</span>  #{product.name.slice(0,20)}</p>

        </div>
    </div>
  )
}
export default ProductDisplay
