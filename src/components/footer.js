import React from 'react';
import Card from 'react-bootstrap/Card'

function Footer(){


  return (
    <Card className="text-center">
  <Card.Header>Self Assessment</Card.Header>
  <Card.Body>
    <Card.Title>Self Assessment</Card.Title>
    <Card.Text>
    Copyright © 2020 Emerging Technologies Inc
    </Card.Text>
    
  </Card.Body>
  <Card.Footer className="text-muted">Copyright</Card.Footer>
</Card>
  ) 
};

export default Footer;