import React, { useState, useEffect } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ReportUser = () => {
 
  
  const [message, setMessage] = useState(null);
  const [submit, setSubmit] = useState(null);
  const [user, setUser] = useState("");

  const [report, setReport] = useState({
    
    pulserate: "",
    bodytemperature: "",
    weight: "",
    bloodpressure: "",
    respiratoryrate: ""
  });

  const handleChange = event => {
    setReport({ ...report, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchdata = async () => {
      let hours = 0.05;
      const jwt = localStorage.getItem("token");
      const time = localStorage.getItem("time");

      if (jwt === undefined) {
        setMessage("Not Authorised");
      }

      if (time && new Date().getTime() - time > hours * 60 * 60 * 1000) {
        console.log(
          "localstorage for true",
          new Date().getTime() - time > hours * 60 * 60 * 1000
        );
        localStorage.removeItem("token");
        localStorage.removeItem("time");
        window.location = "/";
      } else {
        setUser(jwt);
        console.log(
          "localstorage for false",
          new Date().getTime() - time > hours * 60 * 60 * 1000
        );
      }
    };

    fetchdata();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://tryingagain12.herokuapp.com/reportuser", report, {
        headers: {
          "x-auth-token": user,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        
        setMessage("Thanks! See you tomorrow");
        setSubmit(true);
        console.log(response.data.date);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const submitAnother = e => {
    setMessage(null);
    setSubmit(null);
    setReport({
     
      pulserate: "",
      bodytemperature: "",
      weight: "",
      bloodpressure: "",
      respiratoryrate: ""
    });
  };

  return (
    <div>
      {message === null && submit === null ? (
        <div>
          <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit}>
              <h3>Add Report</h3>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Pulse Rate</Form.Label>
                <Form.Control
                  type="text"
                  name="pulserate"
                  value={report.pulserate}
                  placeholder="Enter pulse rate"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicInput">
                <Form.Label>Body Temperature</Form.Label>
                <Form.Control
                  type="text"
                  name="bodytemperature"
                  value={report.bodytemperature}
                  placeholder="Enter body temperature"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="text"
                  name="weight"
                  value={report.weight}
                  placeholder="weight"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Blood Pressure</Form.Label>
                <Form.Control
                  type="text"
                  name="bloodpressure"
                  value={report.bloodpressure}
                  placeholder="blood pressure"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Respiratory Rate</Form.Label>
                <Form.Control
                  type="text"
                  name="respiratoryrate"
                  value={report.respiratoryrate}
                  placeholder="respiratory rate"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <Form onSubmit={submitAnother}>
            <p className="text-success"> {message}...</p>
            <Button variant="primary" type="submit">
              Submit Another
            </Button>
          </Form>
          <br></br>
        </div>
      )}
    </div>
  );
};

export default ReportUser;
