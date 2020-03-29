import React, { useState,useEffect } from 'react';
import axios from 'axios';



const ReportNurse = () =>{

  const[message, setMessage]= useState(null);

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

      }
    }

    fetchdata();
  },[]);

  
const apiUrl= "http://localhost:5000/reportnurse";
const [token, setToken]= useState('ss');

  const [report, setReport] =useState( {patientid:'', patientemail: '',bodytemperature: '',heartrate: '',  bloodpressure: '', respiratoryrate: '' });

  const handleChange = (event) => {
    setReport({...report, [event.target.name]: event.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/reportnurse', report, { headers: {'x-auth-token' :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4MTg2NzY5MjRjODZhMmNiYTAyYjUiLCJmaXJzdG5hbWUiOiJTdWJoIiwiaWF0IjoxNTg0OTg0NjkzfQ.xtms8es4kDYMSXvR8_4AyPU0D_xXvZ3wxG16GGbylx0",
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
     }})
      .then(function (response) {
        setToken(response.data)
          console.log(response.data.date)
      })
      .catch(function (error) {
          console.log(error)
      }) 
    }


  return (

    <div>
       { message===null
       ?
       <div>
      <form className='white' onSubmit={handleSubmit}>
      <input type="text" name="patientid" value={report.patientid} onChange={handleChange} required />
      <input type="text" name="patientemail" value={report.patientemail} onChange={handleChange} required />
      <input type="text" name="bodytemperature" value={report.bodytemperature} onChange={handleChange} required />
      <input type="text" name="heartrate" value={report.heartrate} onChange={handleChange} required />
      <input type="text" name="bloodpressure" value={report.bloodpressure} onChange={handleChange} required />
      <input type="text" name="respiratoryrate" value={report.respiratoryrate} onChange={handleChange} required />
      <div className="input-field"> 
         <button className="btn blue darken-3" type="submit">Add Report</button>
      </div>
      </form>
      </div>
      : < div> <p> {message}...</p></div>
    }
      
      
  </div> 
  )
}

export default ReportNurse;