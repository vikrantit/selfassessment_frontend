import React,{useEffect} from 'react';

const Logout= () => {

  useEffect( ()=> {
    try{
    localStorage.removeItem("token");
    localStorage.removeItem("time");  
    
    
    window.location="/";

    }
    catch(ex){

    }
  },[]);
    return (
      <div>
        <p>Please log in</p>
      </div>
    )

}
export default Logout;