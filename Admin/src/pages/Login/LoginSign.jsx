import React, { useState } from 'react'
import './LoginSign.css'

export const LoginSign = () => {

  const [state,setState] = useState("Login");
  const [formData,setFromData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    setFromData({...formData,[e.target.name]:e.target.value});
  }
// for login 
  const login = async()=>{
    console.log("Login Function Exicuted ", formData);
    let responseData;
    await fetch('http://localhost:8000/admin/login',
      {
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData = data)

      if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
        alert("Welcome");
      }
      else{
        alert(responseData.errors)
      }
    

    
  }
// for signup
  const signup = async()=>{
    console.log("Signup Function Exicuted ",formData);
    let responseData;
    await fetch('http://localhost:8000/admin/create',
      {
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData = data)

      if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
      }
      else{
        alert(responseData.errors)
      }
    
  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state === "Sign Up"?<input onChange={changeHandler} type="text" value={formData.username} name="username" id=""  placeholder='Your Name'/>:<></>} 

          <input onChange={changeHandler} type="email" value={formData.email} name="email"  placeholder='Email Address'/>

          <input onChange={changeHandler} type="password" value={formData.password} name="password" placeholder='Password'/>

        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

        {state === "Sign Up"?<p className="loginsignup-login">Already have an account ? <span onClick={()=>{setState("Login")}}>Login Here</span></p>:<p className="loginsignup-login">Create an account <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        
      </div>
      
    </div>
  )
}
export default LoginSign
