import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import axios from 'axios';
//
function Login() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  
  //store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState('');
  const apiUrl = "http://localhost:5000/login";

  useEffect( ()=> {
    try{
    const jwt= localStorage.getItem("token");
    const user= jwtDecode(jwt);
    setUser( {user});
    console.log("user afted logged in", user);

    }
    catch(ex){

    }
  },[]);
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(username)
    console.log(password)
    try {
      
      const loginData = { username, password  }
      const res = await axios.post(apiUrl, loginData);
      //process the response
      if (res.data.screen !== undefined) {
        localStorage.setItem('token', res.headers['x-auth-token']);
        setScreen(res.data.screen);
        setUser(res.data.user);
        console.log(res.data.screen);
        window.location="/";
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  
  //
  return (
    <div className="App">
      { user=== ''
        ? <div>
          <label>Username: </label>
          <br/>
          <input type="text" onChange={e => setUsername(e.target.value)} />
          <br/>
          <label>Password: </label>
          <br/>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <br/>
          <button onClick={auth}>Login</button>
        </div>
        : <div><h1>Welcome  </h1> 
          <p>How are you feeling today?</p>
          </div>
        //<View screen={screen} setScreen={setScreen} />
      }
    </div>
  );
}

export default Login;

