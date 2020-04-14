import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import jwtDecode from "jwt-decode";

const Addtips = () => {
  const [tips, setTip] = useState({
    tip: ""
  });
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState("");
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
        const user12 = jwtDecode(jwt);
        if(user12.role==="Patient"){
          window.location= "/";
        }


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
    setTip({ ...tips, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("https://tryingagain12.herokuapp.com/addTips", tips, {
        headers: {
          "x-auth-token": user,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        console.log(response);
        setMessage("Submmited");
        setSubmit(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const submitAnother = e => {
    setMessage(null);
    setSubmit(null);
    setTip({ tip: "" });
  };

  return (
    <div className="d-flex justify-content-center">
      {message === null && submit === null ? (
        <div>
          <div className="d-flex p-4">
            <Form onSubmit={handleSubmit}>
              
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label> Tip</Form.Label>
                <Form.Control as="textarea" rows="3" name="tip"
                  placeholder="tip"
                  value={tips.tip}
                  onChange={handleChange} />
              </Form.Group>

              <Button className="center" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div className="d-flex p-4">
          <Form onSubmit={submitAnother}>
            <p className="text-success"> {message}...</p>
            <Button variant="primary" type="submit">
              Submit Another
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Addtips;
