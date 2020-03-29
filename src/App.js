import React,{ useState, useEffect} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import Registration from './components/registration';
import ReportNurse from './components/reportnurse';
import SearchAllreports from './components/searchallreports';
import SearchbyEmail from './components/searchbyemail';
import Login from './components/login';
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Logout from "./components/logout";
import ReportUser from "./components/reportuser";
import Emergency from "./components/emergency";
import Addtips from "./components/addtips";
import Carousel from 'react-bootstrap/Carousel'


function App() {


   //for carousel
   const [index, setIndex] = useState(0);
   const handleSelect = (selectedIndex, e) => {
     setIndex(selectedIndex);
   };

  const [user, setUser] = useState('');
  const [message,setMessage]= useState('');

  useEffect( ()=> {

    const fetchdata= async () => {
      await axios.get('/getTips')
      .then( res=> {
        setMessage(res.data);
      })
      .catch( (err)=>{

      })
    }

    try{
    const jwt= localStorage.getItem("token");
    const user= jwtDecode(jwt);
    console.log("user is here", user);
    console.log("role from app.js is here", user.role);
    setUser( {user});
    //console.log(user);




    }
    catch(ex){

    }
    fetchdata();
  },[]);
  
  return (
    <React.Fragment>
      
      <Navbar u={user}/>
      <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1335&q=80"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1584521764592-48f33fe7e088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      <p><i><marquee>Tips of the Day: {message}</marquee> </i></p>
        <div className="container">
        
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/reportnurse" component={ReportNurse}></Route>
          <Route path="/searchallreports" component={SearchAllreports}></Route>
          <Route path="/searchbyemail" component={SearchbyEmail}></Route>
          <Route path="/reportuser" component={ReportUser}></Route>
          <Route path="/emergency" component={Emergency}></Route>
          <Route path="/addTips" component={Addtips}></Route>
          <Redirect from="/" to="/login" />
          <Redirect to="" />
        </Switch>
        </div>
    </React.Fragment>
  );
}

export default App;
