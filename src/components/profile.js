import React, { useState, useEffect } from "react";

import jwtDecode from "jwt-decode";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Carousel1 from "../components/carousel";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";

const Profile = () => {
  const [message, setMessage] = useState("Loading");

  const [user, setUser] = useState("");
  const [role,setRole] = useState(null);

  useEffect(() => {
    const fetchdata = () => {
      let hours = 0.05;
      const jwt = localStorage.getItem("token");
      const time = localStorage.getItem("time");

      if (jwt === undefined) {
        setMessage("Not Authorised");
      }

      if (time && new Date().getTime() - time > hours * 60 * 60 * 1000) {
        //console.log( "localstorage for true", new Date().getTime() - time> hours * 60 * 60 *1000 );
        localStorage.removeItem("token");
        localStorage.removeItem("time");
        window.location = "/";
      } else {
        const user12 = jwtDecode(jwt);
        setRole(user12.role);
        console.log(user12.role);
        // console.log("from profile page", user12);
        setUser({ user12 });

        //console.log( "localstorage for false", new Date().getTime() - time> hours * 60 * 60 *1000 );
      }
    };

    fetchdata();
    setMessage("Loaded");
    // console.log("message here" ,message);
  }, [message]);


  const nurseprofile = () => {
    return (
      <div className="row">
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="300X200"
              src="https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Card.Body>
              <Card.Title>Add Report</Card.Title>
              <Card.Text>Add a new analysis of your patient</Card.Text>
            </Card.Body>
            <Button variant="primary" onClick={ ()=> {window.location="/reportnurse"}}>New Report</Button>
          </Card>
        </div>
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="300X200"
              src="https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Card.Body>
              <Card.Title>Search</Card.Title>
              <Card.Text>Search the history of your patients</Card.Text>
            </Card.Body>
            <Button variant="primary" onClick={ ()=> {window.location="/searchallreports"}}>Search</Button>
          </Card>
        </div>
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="200X200"
              src="https://images.pexels.com/photos/163066/desk-terminplanung-control-newsletter-163066.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Card.Body>
              <Card.Title>Tip</Card.Title>
              <Card.Text>Add a new tip for your patients</Card.Text>
            </Card.Body>
            <Button variant="primary" onClick={ ()=> {window.location="/addTips"}} >Add Tip</Button>
          </Card>
        </div>
      </div>
    );
  };

  const patientprofile= () => {
    return (
      <div className="row">
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="300X200"
              src="https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Card.Body>
              <Card.Title>Add Report</Card.Title>
              <Card.Text>Add a new analysis for yourself</Card.Text>
            </Card.Body>
            <Button variant="primary" onClick={ ()=> {window.location="/reportuser"}}>New Report</Button>
          </Card>
        </div>
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="300X200"
              src="https://images.pexels.com/photos/3970332/pexels-photo-3970332.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Card.Body>
              <Card.Title>Emergency</Card.Title>
              <Card.Text>Call 911 or Click Below</Card.Text>
            </Card.Body>
            <Button variant="danger" onClick={ ()=> {window.location="/emergency"}}>Emergency</Button>
          </Card>
        </div>
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="200X200"
              src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <Card.Body>
              <Card.Title>Self Diagnosis</Card.Title>
              <Card.Text>Run your symptoms here</Card.Text>
            </Card.Body>
            <Button variant="primary" onClick={ ()=> {window.location="/reportuser"}}>Diagnosis</Button>
          </Card>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Carousel1 />

      <div className="container">
        <Jumbotron>
          <h1></h1>

          {user.user12 !== null && role==="Nurse" ? (
            <div>
            {nurseprofile()}
            </div>
          ) : (
            <div>
              {patientprofile()}
            </div>
          )}
        </Jumbotron>
      </div>
    </div>
  );
};

export default Profile;
