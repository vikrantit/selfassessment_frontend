import React,{Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Login from './components/login';
import Registration from './components/registration';
import ReportNurse from './components/reportnurse';
import SearchAllreports from './components/searchallreports';
import SearchbyEmail from './components/searchbyemail';
import SearchAllreports2 from './components/searchbyemail2';
import Navbar from "./components/navbar";
import movie from './components/movie';

function App() {
  return (
    <React.Fragment>
      
      <Navbar />
        <div className="container">
          
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/reportnurse" component={ReportNurse}></Route>
          <Route path="/searchallreports" component={SearchAllreports}></Route>
          <Route path="/searchbyemail" component={SearchbyEmail}></Route>
          <Route path="/searchbyemail2" component={SearchAllreports2}></Route>
          <Redirect from="/" to="/login" />
          <Redirect to="" />
        </Switch>
        </div>
    </React.Fragment>
  );
}

export default App;
