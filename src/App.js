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
import Carousel1 from './components/carousel';
import Footer from './components/footer';

import LoginTrial from "./components/logintrial";
import Team from './components/team';



function App() {     

  const [user, setUser] = useState('');
  const [message,setMessage]= useState('');

  useEffect( ()=> {

    const fetchdata= async () => {
      await axios.get('https://tryingagain12.herokuapp.com/getTips')
      .then( res=> {
        setMessage(res.data);
      })
      .catch( (err)=>{

      })
    }

    try{
    const jwt= localStorage.getItem("token");
    const user= jwtDecode(jwt);
   
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

      
      <p className="text-secondary"><i><marquee>Tips of the Day: {message}</marquee> </i></p>
        <div className="">
        
        <Switch>
          <Route path="/login" component={LoginTrial}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/reportnurse" component={ReportNurse}></Route>
          <Route path="/team" component={Team}></Route>
         
          <Route path="/searchallreports" component={SearchAllreports}></Route>
          <Route path="/searchbyemail" component={SearchbyEmail}></Route>
          <Route path="/reportuser" component={ReportUser}></Route>
          <Route path="/emergency" component={Emergency}></Route>
          <Route path="/addTips" component={Addtips}></Route>
          <Redirect from="/" to="/login" />
          <Redirect to="" />
        </Switch>
        </div>
        <br></br>
        <Footer />
    </React.Fragment>
  );
}

export default App;
