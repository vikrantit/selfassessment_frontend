import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchbyEmail = () => {
  const [token, setToken] = useState(null);
  const [report, setReport] = useState({ patientemail: "" });
  //modified part
  const [idfrombutton, setidfrombutton] = useState('');
  const [data, setData] = useState([]);
  const [listError, setListError] = useState(false);
  const [cookie, setCookie] = useState('');

  useEffect(() => {
    const fetchCookie = async () => {
      const cookieurl= await axios
        .get("/read_cookie")
        .then(res => {
          setCookie(res.data);

        })
        .catch(err => {
          setListError(true);
        });
    };

    fetchCookie();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .post("/listbyemail", report, {
          headers: {
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4MTg2NzY5MjRjODZhMmNiYTAyYjUiLCJmaXJzdG5hbWUiOiJTdWJoIiwiaWF0IjoxNTg0OTg0NjkzfQ.xtms8es4kDYMSXvR8_4AyPU0D_xXvZ3wxG16GGbylx0",
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          setListError(true);
        });
    };

    fetchdata();
  }, [idfrombutton]);

  const handleChange = event => {
    setReport({ ...report, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    setidfrombutton(report);
  };

  const handleClick =() => {
    setidfrombutton(report.patientemail);
}

  return (
    <div>
      
            <input
              type="text"
              name="patientemail"
              value={report.patientemail}
              onChange={handleChange}
              required
            />
            <div className="input-field">
              <button className="btn" type="submit" onClick={handleClick}>
                Search
              </button>
            </div>
          
      {data.length !== 0  ? (
        <div className="justify-content-center p-3 ">
          
          <table className="table">
            <thead>
              <tr>
                <th>Patient Email</th>
                <th>Heart Rate</th>
                <th>Blood Pressure</th>
                <th>Respiratory Rate</th>
                <th>Body Temperature</th>
                <th>Nurse Name</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.patientemail}</td>
                  <td>{item.heartrate}</td>
                  <td>{item.bloodpressure}</td>
                  <td>{item.respiratoryrate}</td>
                  <td>{item.bodytemperature}</td>
                  <td>{item.nursename}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="d-flex justify-content-center p-3 ">
          {" "}
          <p>You need to Login First</p>
        </div>
      )}
    </div>
  );
};

export default SearchbyEmail;
