import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {useParams} from 'react-router-dom'
import Beradcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDispaly/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../components/RelatedProduct/RelatedProduct';

export const Product = () => {
  const {all_product}=useContext(ShopContext);
  const {productId}= useParams();
  const product = all_product.find((e)=>e.id ===  Number(productId));
 


  return (
    <div>
      <Beradcrum product={product}/>
      <ProductDisplay product = {product}/>
      <DescriptionBox/>
      <RelatedProduct/>
    </div>
  )
}
export default Product