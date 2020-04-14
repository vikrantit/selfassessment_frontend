import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    error: "",
    success: false,
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`https://tryingagain12.herokuapp.com/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
      })
      .then((res) => {
        if (res.data.err) {
          console.log("here", res.data.err);
          setValues({ ...values, error: res.data.err, success: false });
        } else {
          console.log("register working");

          setValues({
            ...values,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmpassword: "",
            success: true,
          });
          console.log(res);
          localStorage.setItem("token", res.headers["x-auth-token"]);
          localStorage.setItem("time", new Date().getTime());
          window.location = "/";
        }
      })

      .catch((err) => {
        console.log(err);
        console.log("here in catch block");
        setValues({ ...values, error: err, success: false });
        console.log(err);
      });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
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
        <Link to="/registration">Register Again</Link>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">First Name</label>
              <input
                className="form-control"
                onChange={handleChange("firstName")}
                type="text"
                value={firstName}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Last Name</label>
              <input
                className="form-control"
                onChange={handleChange("lastName")}
                type="text"
                value={lastName}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="text"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="text"
                value={password}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Confirm Password</label>
              <input
                className="form-control"
                onChange={handleChange("confirmpassword")}
                type="text"
                value={confirmpassword}
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
      {signUpForm()}
      {successMessage()}
      {errorMessage()}
    </div>
  );
};

export default Signup;
