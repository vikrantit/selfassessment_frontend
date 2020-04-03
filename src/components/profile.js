import React, {useState, useEffect} from 'react';

import jwtDecode from 'jwt-decode';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'


const Profile= () => { 

  
  const[message, setMessage]= useState("Loading");
  
  const [user, setUser] = useState('');

  useEffect( ()=> {
    
    
    
    const fetchdata=  () => {

      let hours= 0.05;
      const jwt= localStorage.getItem("token");
      const time= localStorage.getItem("time");

      
      if(jwt === undefined){
        setMessage("Not Authorised");
      }

      if(time && (new Date().getTime() - time > hours * 60 * 60 *1000 )){
        //console.log( "localstorage for true", new Date().getTime() - time> hours * 60 * 60 *1000 );
        localStorage.removeItem('token');
        localStorage.removeItem('time');
        window.location="/";
      }
      else{
        const user12= jwtDecode(jwt);
       // console.log("from profile page", user12);
        setUser( {user12});
        //console.log( "localstorage for false", new Date().getTime() - time> hours * 60 * 60 *1000 );
        };
  }

    fetchdata();
    setMessage("Loaded");
   // console.log("message here" ,message);
  },[message]);


return(
  <div>
    <Jumbotron>
  <h1>Hello, {user.role}!</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
  <p>
    <Button variant="primary">Learn more</Button>
  </p>
</Jumbotron>
  </div>
  )
}

export default Profile;
