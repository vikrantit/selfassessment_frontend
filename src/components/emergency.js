import React, { useState, useEffect } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Emergency = () => {
  const [report, setReport] = useState({
    message: ""
  });

  const [user, setUser] = useState("");
  const [message, setMessage] = useState(null);
  const [submit, setSubmit] = useState(null);

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

  const handleChange = event => {
    setReport({
      ...report,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://tryingagain12.herokuapp.com/emergency", report, {
        headers: {
          "x-auth-token": user,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        
        setMessage("Thank You! We will contact you shortly");
        setSubmit(true);
        console.log(response.data.date);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const submitAnother = e => {
    
  };

  return (
    <div  className="d-flex justify-content-center">
      {message === null && submit === null ? (
        <div>
      <Form onSubmit={handleSubmit}>
        <h3>Emergency</h3>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            name="message"
            value={report.message}
            placeholder="message"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Send
        </Button>
      </Form>
      </div>
      ) : (
        <div className="d-flex p-4">
          <Form onSubmit={submitAnother}>
            <p> {message}</p>
            <Button variant="success" type="submit">
              Contact Emergency
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Emergency;
