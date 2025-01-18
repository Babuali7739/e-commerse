import React from 'react'
import './Admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Routes, Route,Navigate} from 'react-router-dom'
import AddProduct from '../../components/AddProduct/AddProduct'
import ListProduct from '../../components/ListProduct/ListProduct'
import LoginSign from '../Login/LoginSign';



const Admin = () => {
  
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element = {<AddProduct/>} />
        <Route path='/listproduct' element = {<ListProduct/>} />
        <Route path='/login' element = {<LoginSign/>} />
      </Routes>
    </div>
  )
}

export default Admin