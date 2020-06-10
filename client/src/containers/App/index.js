import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./style.css"

class App extends Component {

  render() {
    return (
      <Container fluid className="app-container">
        <Row className="app-row">
          <Header />
        </Row>
        <Row noGutters className="d-flex justify-content-center spacer-bottom">
          <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:12}} xl={{span:12}} className="app-col">
            {this.props.children}
          </Col>
        </Row>
        <Row className="app-row">
          <Footer />
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
)(App);