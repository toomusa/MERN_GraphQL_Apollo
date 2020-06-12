import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WorkLogView from "../../components/WorkLogView";
import "./style.css";
import Table from '../../containers/Table';

class Dashboard extends Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col className="main-section">
            <h2 className="my-4">View Your Data</h2>
            <Container>
              <Tabs defaultActiveKey="workLogsTable">
                <Tab eventKey="workLogsTable" title="Work Logs Table">
                  <div className="segment">
                    <h3 className="text-center">Work Logs Table</h3>
                    <Table />
                  </div>
                </Tab>
                <Tab eventKey="workLogsList" title="Work Logs List">
                  <div className="segment">
                    <h3 className="text-center">Work Logs List</h3>
                    <WorkLogView />
                  </div>
                </Tab>
                <Tab eventKey="jobCards" title="Job Cards">
                  <div className="segment">
                    <h3 className="text-center">Job Cards</h3>
                  </div>
                </Tab>
              </Tabs>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dashboard;