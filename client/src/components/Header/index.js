import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from "../../containers/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';

export default function Header() {
  return (
    <Container fluid className="header-container">
      <Row noGutters>
        <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:12}}>
          <h3>Header</h3>
        </Col>
      </Row>
      <Navbar />
    </Container>
  )
}
