import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { signup } from "../../actions/authActions";
import Button from 'react-bootstrap/Button';
import history from "../../services/history";
import "./style.css";

class RegToggle extends Component {

  state = {
    show: false,
    regtype: ""
  }
  
  toggle = () => {
    console.log("toggle")
    this.setState({
      show: !this.state.show
    })
  }

  onSubmit = formProps => {     
    this.toggle();
    Object.assign( formProps, { regtype: this.state.regtype })
    this.props.signup(formProps, validUser => {
      this.props.hideAuth();
      console.log(validUser.data)
      if (validUser.data.regtype === "Client") {
        history.push("/journey");
      } else if (validUser.data.regtype === "Coach") {
        history.push("/dashboard");
      } else {
        history.push("/");
      }
    })
  }

  selectOption = e => {
    this.setState({
      regtype: e.target.value
    })
    this.toggle()
  }
  
  render() {
    return (
      <>
        <Button 
          onClick={this.selectOption} 
          value={this.props.reg}
          size="sm" 
          variant={this.state.show ? "warning" : "light"} 
          className="toggleBtn shadow-none">{this.props.reg}</Button>
        {this.props.children({
          show: this.state.show,
          toggle: this.toggle,
          onSubmit: this.onSubmit,
          reg: this.props.reg,
          regtype: this.state.regtype
        })}
      </>
    )
  }
}

function mapStateToProps() {
  return {};
}

export default compose(
  connect(mapStateToProps, { signup }),
)(RegToggle);