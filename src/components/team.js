import React from "react";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import simerjit from "../images/simerjit.jpeg";
import bhupinder from "../images/bhupinder.jpeg";
import subhankar from "../images/subhankar.jpeg";
import vikrant from "../images/vikrant.jpeg";
import keshav from "../images/keshav.jpg";
import bhupinder2 from "../images/bhupinder2.jpg";

const Team = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="300X200"
              src={subhankar}
            />
            <Card.Body>
              <Card.Title>Subhankar</Card.Title>
              <Card.Text>Full Stack Developer</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="300X200"
              src={keshav}
            />
            <Card.Body>
              <Card.Title>Keshav</Card.Title>
              <Card.Text>Full Stack Developer</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="200X200"
              src={simerjit}
            />
            <Card.Body>
              <Card.Title>Simerjit</Card.Title>
              <Card.Text>Full Stack Developer</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <br></br>
      <div className="row">
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="300X200"
              src= {vikrant}
            />
            
            <Card.Body>
              <Card.Title>Vikrant</Card.Title>
              <Card.Text>Full Stack Developer</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={300}
              height={200}
              alt="200X150"
              src={bhupinder2}
            />
            <Card.Body>
              <Card.Title>Bhupinder</Card.Title>
              <Card.Text>Full Stack Developer</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm">
          <Card style={{ width: "18rem" }}>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src="holder.js/171x180"
            />
            <Card.Body>
              <Card.Title>Jerry</Card.Title>
              <Card.Text>Full Stack Developer</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;
