import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Jumbotron from "react-bootstrap/Jumbotron";

const LoginTrial = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      let hours = 0.05;
      const jwt = localStorage.getItem("token");
      const time = localStorage.getItem("time");

      if (jwt && new Date().getTime() - time > hours * 60 * 60 * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("time");
        window.location = "/";
      } else {
        const user = jwtDecode(jwt);
        setUser(user);
      }
    } catch (ex) {}
  }, []);

  const { username, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    console.log("here");
    axios
      .post(`http://localhost:5000/login`, { username, password })

      .then((res) => {
        if (res.data.err) {
          console.log(res.data.err);
          setValues({ ...values, error: res.data.err, loading: false });
        } else {
          setValues({ ...values, didRedirect: true });
          localStorage.setItem("token", res.headers["x-auth-token"]);
          localStorage.setItem("time", new Date().getTime());
          window.location = "/";
        }
      })

      .catch((err) => {
        setValues({ ...values, error: err, success: false });
        console.log(err);
      });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: error ? "" : "none" }}
      >
        New account was created successfully.
        <Link to="/login">Welcome</Link>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {JSON.stringify(error)}
        <Link to="/registration">Login Again</Link>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                value={username}
                onChange={handleChange("username")}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                value={password}
                onChange={handleChange("password")}
                className="form-control"
                type="password"
              />
            </div>

            <button onClick={onSubmit} className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      {user === null ? (
        <div>
          {signInForm()} {errorMessage()}
        </div>
      ) : (
        <div>
         
          <Jumbotron>
            <p> Welcome {user.firstName} {user.lastName} </p>
          </Jumbotron>
        </div>
      )}
    </div>
  );
};

export default LoginTrial;
