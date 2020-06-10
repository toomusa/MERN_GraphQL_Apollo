import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Dashboard extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="main-section">
            <h2>Dashboard Page</h2>
          </Col>
        </Row>
      </Container>
    )
  }
}
