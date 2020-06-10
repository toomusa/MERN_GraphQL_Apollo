import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import validator from "validator";
import { login, signup } from "../../actions/authActions";
import Button from 'react-bootstrap/Button';
import history from "../../services/history";
import "./style.css";

class Auth extends Component {

  state = {
    authAction: '',
    formError: ''
  }

  componentDidMount() {
    this.setState({
      authAction: this.props.authAction
    })
  }
  
  renderErrors = ({ error, touched }) => {
    if (touched && error) {
      this.setState({
        formError: error
      })
    }
  }

  resetError = () => {
    setTimeout( () => {
      this.setState({
        formError: ''
      })
    }, 3000)
  }

  flashError = () => {
    if (this.state.formError) {
      this.resetError();
      return (
        <span>{this.state.formError}</span>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <span>
        <input {...input} className="auth-input" placeholder={label} type={input.name} />
        {this.renderErrors(meta)}
      </span>
    )
  }

  onSubmit = async formProps => {
    
    const errors = validate(formProps);
    if (errors.error) {
      this.setState({
        formError: errors.error
      })
    } else {
      let { authAction } = this.state;
      switch(authAction) {
        case "login":
          console.log(authAction);
          
          this.props.login(formProps, validUser => {
            console.log(validUser);
            this.props.hideAuth()
            if (validUser.data.regtype === "Client") {
              history.push("/journey");
            } else if (validUser.data.regtype === "Coach") {
              history.push("/dashboard");
            } else {
              history.push("/");
            }
          })
          break;
        case "signup":
          this.props.signup(formProps, validUser => {
            if (validUser.data.regtype === "Client") {
              history.push("/journey");
            } else if (validUser.data.regtype === "Coach") {
              history.push("/dashboard");
            } else {
              history.push("/");
            }
          })
          break;
        default:
          alert("Something went wrong, try again.")
      }
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { auth } = this.props.state.page.content;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="form-tag">
        <fieldset>
          <Field
            name="email"
            type="text"
            label={auth.email}
            autoComplete="none"
            className="auth-input"
            component={this.renderInput}
            />
          <Field
            name="password"
            type="password"
            label={auth.password}
            autoComplete="none"
            className="auth-input"
            component={this.renderInput}
            />
          <Button variant="light" size="sm" className="submitBtn" type="submit">{auth.submit}</Button>
        </fieldset>
        {this.state.formError ? this.flashError() : <div></div>}
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { state, errorMessage: state.auth.errorMessage };
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.error = "You must enter an email";
  }
  if (formValues.email) {
    if (!validator.isEmail(formValues.email)) {
      errors.error = "You must enter a valid email address";
    }
  }
  if (!formValues.password) {
    errors.error = "You must enter a password";
  }
  return errors;
}

export default compose(
  connect(mapStateToProps, { login, signup }),
  reduxForm({
    form: "userValidation",
  })
)(Auth);