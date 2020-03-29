import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Profile= () => { 

  const [data,setData]= useState([]);
  const[message, setMessage]= useState("Loading");
  const [listError, setListError] = useState(false);

  useEffect( ()=> {
    

    const fetchdata= async () => {

      let hours= 0.05;
      const jwt= localStorage.getItem("token");
      const time= localStorage.getItem("time");

      
      if(jwt == undefined){
        setMessage("Not Authorised");
      }

      if(time && (new Date().getTime() - time > hours * 60 * 60 *1000 )){
        console.log( "localstorage for true", new Date().getTime() - time> hours * 60 * 60 *1000 );
        localStorage.removeItem('token');
        localStorage.removeItem('time');
        window.location="/";
      }
      else{
        console.log( "localstorage for false", new Date().getTime() - time> hours * 60 * 60 *1000 );
        };
  }

    fetchdata();
  }, []);


return(
  <div>
    <h1>Welcome </h1>
    <p>Agenda for Today</p>
  </div>
  )
}

export default Profile;
