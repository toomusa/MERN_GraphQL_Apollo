import React, { Component } from 'react'
import { reduxForm, Field, reset } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import check from '../../utils/validateForms';
import normalizePhone from '../../utils/normalizePhone';
import UsStates from "../../static/UsStates";
import "./style.css";
import axios from "axios";

class RegForm extends Component {

  state = {
    formFields: []
  }

  componentDidMount() {
    this.renderFields();
  }

  renderFields() {
    const { reg } = this.props.state.page.content;
    const regForms = {
      all: [
        { name: "fname", label: reg.first, component: this.renderInput, type: "text", normalize: check.normName, validate: [check.required] },
        { name: "lname", label: reg.last, component: this.renderInput, type: "text", normalize: check.normName, validate: [check.required] },
        { name: "email", label: reg.email, component: this.renderInput, type: "text", validate: [check.required, check.isEmail] },
        { name: "password", label: reg.password, component: this.renderInput, type: "password", validate: [check.required, check.minLength(8), check.hasNum, check.hasSpecial] },
        { name: "cell", label: reg.phone, component: this.renderInput, type: "tel", normalize: normalizePhone, validate: [check.required, check.isPhone] }
      ],
      coach: [
        { name: "title", label: reg.title, component: this.renderInput, type: "text", validate: [check.required] },
        { name: "focus", label: reg.focus, component: this.renderInput, type: "text", validate: [check.required] },
        { name: "bday", label: reg.birth, component: this.renderInput, type: "date", validate: [check.required] }
      ],
      client: [
        { name: "bday", label: reg.birth, component: this.renderInput, type: "date", validate: [check.required] }
      ],
      partner: [
        { name: "org", label: reg.org, component: this.renderInput, type: "text", validate: [check.required] },
        { name: "title", label: reg.title, component: this.renderInput, type: "text", validate: [check.required] },
        { name: "city", label: reg.city, component: this.renderInput, type: "text", validate: [check.required] },
        { name: "state", label: reg.state, component: this.renderList, type: "text", validate: [check.required] }
      ]
    }
    switch (this.props.reg) {
      case "client":
        this.setState({ formFields: [...regForms.all, ...regForms.client] })
        break;
      case "coach":
        this.setState({ formFields: [...regForms.all, ...regForms.coach] })
        break;
      case "partner":
        this.setState({ formFields: [...regForms.all, ...regForms.partner] })
        break;
      default:
        break;
    }
  }

  renderInput = field => {
    return (
      <div className="form-row form-group input-box">
        <label className="col-md-3 col-sm-12 d-inline-block mt-2">{field.label}:</label>
        <div className="col-md-9 col-sm-12">
          <div className={field.meta.asyncValidating ? 'async-validating' : ''}>
            <input className="form-control d-inline-block w-100 input-elem" {...field.input} {...field} />
            {field.meta.touched && field.meta.error && <span className="error-text w-100 ml-2">* {field.meta.error}</span>}
          </div>
        </div>
      </div>
    )
  }

  renderList = field => {
    return (
      <div className="form-row form-group input-box">
        <label className="col-md-3 col-sm-12 d-inline-block mt-2">{field.label}:</label>
        <div className="col-md-9 col-sm-12">
          <select {...field.input} {...field} autoComplete="on" className="form-control d-inline-block w-100 input-elem">
            <option value="">Select a State</option>
            {UsStates.map((state, idx) => <option value={state["name"]} key={idx + 1}>{state["abbreviation"]}</option>)}
          </select>
          {field.meta.touched && field.meta.error && <span className="error-text w-100">* {field.meta.error}</span>}
        </div>
      </div>
    )
  }

  resetAndToggle = () => {
    this.props.toggle();
    this.props.dispatch(reset("Reg-Form"))
  }

  submitAndToggle = formProps => {
      this.props.onSubmit(formProps);
      this.props.dispatch(reset("Reg-Form"))
  }

  render() {
    const { handleSubmit, pristine, reset, invalid, submitting } = this.props;
    const { reg } = this.props.state.page.content;
    return (
      <Modal show={this.props.show} onHide={this.resetAndToggle} >
        <form onSubmit={handleSubmit(this.submitAndToggle)}>
          <Modal.Header>
            <Modal.Title className="mx-auto">{reg.join}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            <fieldset className="fieldset-div">
              {this.state.formFields.map((form, idx) => (
                <Field
                  name={form.name}
                  type={form.type}
                  label={form.label}
                  component={form.component}
                  validate={form.validate}
                  normalize={form.normalize}
                  key={idx}
                />
              )
              )}
            </fieldset>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="light" onClick={reset} disabled={pristine || submitting }>
              Clear
            </Button>
            <Button variant="secondary" onClick={this.resetAndToggle}>
              {reg.cancel}
            </Button>
            <Button variant="primary" type="submit" disabled={pristine || invalid || submitting}>
              {reg.signup}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

const asyncValidate = async ({ email }) => {
  try {
    const {data} = await axios.get(`/auth/emails?email=${email}`);
    if (data) {
      throw new Error('Email is already taken');
    }
  } catch (e) {
    throw e;
  }
}

function mapStateToProps(state) {
  return { state, errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, {}),
  reduxForm({
    form: "Reg-Form",
    asyncValidate,
    asyncBlurFields: ['email']
  })
)(RegForm);
