import React, { useState,useEffect } from 'react';
import axios from 'axios';


const Login = () =>{

  const [screen, setScreen]= useState('auth');
  const [email, setEmail]= useState();
  const [password, setPassword]= useState();
  const [token, setToken]= useState('ss');
  const [button, setButton]= useState('');
  const apiUrl= "http://localhost:5000/login";


  const [login, setLogin] =useState( {email:'', password: ''});
  

  const handleChange = (event) => {
    setLogin({...login, [event.target.name]: event.target.value})
  }

const handleSubmit = (e) => {
  e.preventDefault()
  axios.post(apiUrl, login)
    .then(function (response) {
      setToken(response.data.token)
        console.log(response)
    })
    .catch(function (error) {
        console.log(error)
    }) 
  }

    return (

      <div>
    
        <form className='white' onSubmit={handleSubmit}>
        <input type="text" name="email" value={login.email} onChange={handleChange} required />
        <input type="text" name="password" value={login.password} onChange={handleChange} required />

        <div className="input-field"> 
                    <button className="btn blue darken-3" type="submit">Login</button>
                </div>
        </form>

        {token}
        
    </div> 
    )

}

export default Login;