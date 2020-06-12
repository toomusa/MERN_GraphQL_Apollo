import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddLogForm from '../../components/AddLogForm';
import "./style.css";

class Home extends Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="main-section">
            <h2 className="my-4">Enter a New Log</h2>
            <Container className="w-50">
              <AddLogForm />
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home;