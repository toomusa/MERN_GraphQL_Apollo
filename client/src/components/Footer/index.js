import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';

class Footer extends Component {
  render() {
    return (
      <Container fluid className="footer-container">
        <Row>
          <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:12}}>
            <h3>Footer</h3>
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
)(Footer);
