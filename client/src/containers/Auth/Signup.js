import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import RegToggle from "../../components/RegToggle";
import RegForm from "../../components/RegForm";
import "./style.css";

class Signup extends Component {

  render() {
    const { auth } = this.props.state.page.content;
    const regButtons = [ 
      {toggle: auth.client, reg: "client"}, 
      {toggle: auth.coach, reg: "coach"}, 
      {toggle: auth.partner, reg: "partner"}
    ];
    return (
      <div className="selector-div ml-auto d-flex justify-content-end">
        <ButtonToolbar className="ml-auto">
        <span className="selector-caption text-light">{auth.select}</span>
          {regButtons.map((button, idx) => (
            <RegToggle reg={button.toggle} hideAuth={this.props.hideAuth} key={idx} >
              {({ show, toggle, onSubmit, regtype }) => (
                <RegForm show={show} toggle={toggle} onSubmit={onSubmit} regtype={regtype} reg={button.reg} />
              )}
            </RegToggle>
          ))}
        </ButtonToolbar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { state, errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, {})
)(Signup);