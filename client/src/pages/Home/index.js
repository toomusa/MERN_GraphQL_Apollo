import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./style.css";

class Home extends Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="main-section">
            <h2>Home Page</h2>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(
  connect(mapStateToProps, {}),
)(Home);