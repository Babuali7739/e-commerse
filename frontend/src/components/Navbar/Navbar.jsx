import React, { useContext, useState,} from 'react';
import { useEffect } from 'react';
import './Navbar.css'
import { IoIosMenu } from "react-icons/io";
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
export const Navbar = () => {
    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openmenu = ()=>{
    setIsMenuOpen(!isMenuOpen);
    };
    
    useEffect(() => {
      const handleResize = () => {
          if (window.innerWidth > 768 && isMenuOpen) {
              setIsMenuOpen(false);
          }
      };
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, [isMenuOpen]);

  return (
    <div className='navbar'>
        <div className="nav_logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link to ='/' style={{textDecoration :'none'}}>Shop </Link> {menu === "shop"?<hr />:<></>}</li>

            <li onClick={()=>{setMenu("mens")}}><Link to ='/mens'  style={{textDecoration :'none'}}>Men</Link>{menu === "mens"?<hr />:<></>}</li>

            <li onClick={()=>{setMenu("womens")}}><Link to ='/womens'  style={{textDecoration :'none'}}>Women</Link>  {menu === "womens"?<hr />:<></>}</li>

            <li onClick={()=>{setMenu("kids")}}><Link to ='kids'  style={{textDecoration :'none'}}>Kid</Link> {menu === "kids"?<hr />:<></>}</li>
          
        </ul>
        <div className="nav-login-cart">

          {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to = '/login'  style={{textDecoration :'none'}}><button>Login</button></Link> }
          
          <Link to='/cart' style={{textDecoration :'none'}}><img className='cart' src={cart_icon} alt="" /></Link>  
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        <IoIosMenu onClick={openmenu} className='menubar'/>
        {isMenuOpen && (
                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li onClick={() => { setMenu("shop"); openmenu(); }}><Link to='/' style={{ textDecoration: 'none' }}>Shop</Link></li>
                        <li onClick={() => { setMenu("mens"); openmenu(); }}><Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link></li>
                        <li onClick={() => { setMenu("womens"); openmenu(); }}><Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link></li>
                        <li onClick={() => { setMenu("kids"); openmenu(); }}><Link to='/kids' style={{ textDecoration: 'none' }}>Kid</Link></li>
                    </ul>
                </div>
            )}
     </div>
     
  )
}
