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



function App() {

  /////////////////////////////////
  //activityWatcher();
  

/*function activityWatcher(){
 
  //The number of seconds that have passed
  //since the user was active.
  var secondsSinceLastActivity = 0;

  //Five minutes. 60 x 5 = 300 seconds.
  var maxInactivity = (60 * 5);

  //Setup the setInterval method to run
  //every second. 1000 milliseconds = 1 second.
  setInterval(function(){
      secondsSinceLastActivity++;
      //console.log(secondsSinceLastActivity + ' seconds since the user was last active');
      //if the user has been inactive or idle for longer
      //then the seconds specified in maxInactivity
      return secondsSinceLastActivity;
      if(secondsSinceLastActivity > maxInactivity){
          //console.log('User has been inactive for more than ' + maxInactivity + ' seconds');
          //Redirect them to your logout.php page.
          //location.href = 'logout.php';
      }
  }, 1000);

  //The function that will be called whenever a user is active
  function activity(){
      //reset the secondsSinceLastActivity variable
      //back to 0
      secondsSinceLastActivity = 0;
  }

  //An array of DOM events that should be interpreted as
  //user activity.
  var activityEvents = [
      'mousedown', 'mousemove', 'keydown',
      'scroll', 'touchstart'
  ];

  //add these events to the document.
  //register the activity function as the listener parameter.
  activityEvents.forEach(function(eventName) {
      document.addEventListener(eventName, activity, true);
  });
  
}
activityWatcher();*/

  ////////////////////////////////


   

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
      <Carousel1 />
      
      <p><i><marquee>Tips of the Day: {message}</marquee> </i></p>
        <div className="p-4">
        
        <Switch>
          <Route path="/logintrial" component={LoginTrial}></Route>
          <Route path="/logintrial" component={LoginTrial}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/reportnurse" component={ReportNurse}></Route>
          <Route path="/searchallreports" component={SearchAllreports}></Route>
          <Route path="/searchbyemail" component={SearchbyEmail}></Route>
          <Route path="/reportuser" component={ReportUser}></Route>
          <Route path="/emergency" component={Emergency}></Route>
          <Route path="/addTips" component={Addtips}></Route>
          <Redirect from="/" to="/logintrial" />
          <Redirect to="" />
        </Switch>
        </div>
        <Footer />
    </React.Fragment>
  );
}

export default App;
