import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

const LoginTrial = () => {
  const [log, setLog] = useState(null);
  const [log2, setLog2] = useState(null);
  const [user, setUser] = useState("");
  const apiUrl = "https://tryingagain12.herokuapp.com/login";
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [debugmessage,setDebugMessage]= useState('not logged');
  var res;

  const handleChange = event => {
   setLogin({
      ...login,
      [event.target.name]: event.target.value
    });
    console.log(login);
  };

  useEffect(() => {
    
    const fetchdata = async () => {
      let hours = 0.05;
      const jwt = localStorage.getItem("token");
      const time = localStorage.getItem("time");

      if (time && new Date().getTime() - time > hours * 60 * 60 * 1000) {
        console.log(
          "localstorage for true",
          new Date().getTime() - time > hours * 60 * 60 * 1000
        );
        console.log("user logged finally");
        localStorage.removeItem("token");
        localStorage.removeItem("time");
        
        window.location = "/";
      } else if(time && new Date().getTime() - time < hours * 60 * 60 * 1000)  {
        const user = jwtDecode(jwt);
        setUser({ user });
        setLog(true);
        console.log("User logged in");
      }
      else{
        setLog(false);
        console.log("User not logged in");
      }
    };

    fetchdata();
  }, []);

  useEffect( ()=> {
    const loginfunction = async () => {
      try{
         res = await axios.post(apiUrl, login);
        console.log(res);
  
  
        if(res.data.screen=== undefined){
          setDebugMessage("not defined");
          
        }
        if( res.data.screen !==undefined){
          setDebugMessage("user found");
          console.log(res.data);
          localStorage.setItem("token", res.headers["x-auth-token"]);
          localStorage.setItem("time", new Date().getTime());
          setLog(true);
          window.location = "/";
    }
  }
    catch(err){
      console.log(err);
    }
  }
    loginfunction();


  }, [log2]);


  const auth =  async () => {
    /*try{
      const res = await axios.post(apiUrl, login);
      console.log(res);


      if(res.data.screen=== undefined){
        setDebugMessage("not defined");
        
      }
      if( res.data.screen !==undefined){
        setDebugMessage("user found");
        localStorage.setItem("token", res.headers["x-auth-token"]);
        localStorage.setItem("time", new Date().getTime());
        setLog(true);
        
      }
    }
    catch(err){
      console.log(err);
    }*/
    setLog2("true");
    
  }

  return (
    <div>
      <p>{debugmessage}</p>
      {!log  ?
      <div className="d-flex justify-content-center">
        <Form onSubmit={auth}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="username"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" >
            Login
          </Button>
        </Form>
        
      </div>




      : <div>
      <Jumbotron>
              <h1>Hello!</h1>
              <h1>Welcome {user.user.firstName} </h1>
              <p>How are you feeling today?</p>
              <p>
                This portion needs to be edited!
              </p>

              <form>
                <Button variant="primary">Amazing</Button>
              </form>
            </Jumbotron>
            </div>
}
    </div>
  );
};

export default LoginTrial;
