import React from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart';
import list_product_icon from '../../assets/Product_list_icon.svg';

const Sidebar = () => {
  return (
    <div className='sidebar'>
     <Link to={'./addproduct'} style={{textDecoration:"none"}}>
        <div className="side-bar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
        </div>
     </Link>
     <Link to={'./listproduct'} style={{textDecoration:"none"}}>
        <div className="side-bar-item">
            <img src={list_product_icon} alt="" />
            <p>List Product</p>
        </div>
     </Link>
    </div>
  )
}

export default Sidebar
