import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom"
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Auth from "../Auth"
import './style.css';
import Signup from '../Auth/Signup';
import Signout from '../Auth/Signout';
import { loadEnglish, loadSpanish } from "../../actions/pageActions";
import content from "../../static/content";

class Navigation extends Component {

  state = {
    authAction: '',
    authForm: false,
    btnLogin: { clicked: false, disabled: false },
    btnSignup: { clicked: false, disabled: false },
    navLinks: [],
    enLang: true
  }

  renderNavLinks = (link,idx) => {
    if (link.auth === "all") {
      return (
        <span className="link-span" key={idx}>
          <div className="nav-div">
            <NavLink exact to={link.path} className="link-tag" activeClassName="link-active" role="button">
              {link.name}
            </NavLink>
          </div>
        </span>
      )
    } else return;
  }

  logoutUser = () => {
    this.setState({
      authForm: false,
      authAction: '',
      btnLogin: {
        clicked: false,
        disabled: false
      },
      btnSignup: {
        clicked: false,
        disabled: false
      }
    })
  }

  selectAuth = authType => {
    if (authType === "login") {
      this.setState({
        authForm: !this.state.authForm,
        authAction: authType ? authType : '',
        btnLogin: {
          clicked: !this.state.btnLogin.clicked,
        },
        btnSignup: {
          disabled: !this.state.btnSignup.disabled
        }
      })
    }
    if (authType === "signup") {
      this.setState({
        authForm: !this.state.authForm,
        authAction: authType ? authType : '',
        btnLogin: {
          disabled: !this.state.btnLogin.disabled
        },
        btnSignup: {
          clicked: !this.state.btnSignup.clicked,
        }
      })
    }
  }

  selectLang = lang => {
    switch (lang) {
      case "en":
        if (!this.state.enLang) {
          this.props.loadEnglish(content.en);
        }
        this.setState({
          enLang: true
        })
        break;
      case "es":
        if (this.state.enLang) {
          this.props.loadSpanish(content.es);
        }
        this.setState({
          enLang: false
        })
        break;
      default:
        break;
    }
  }

  hideAuth = () => {
    this.setState({
      authForm: !this.state.authForm
    })
  }

  renderForm = () => {
    let { authAction } = this.state;
    if (authAction === "login") {
      return (
        <Auth authAction={authAction} hideAuth={this.hideAuth} />
      )
    }
    if (authAction === "signup") {
      return (
        <Signup hideAuth={this.hideAuth} />
      )
    }
  }

  renderAuth = () => {
    const { auth } = this.props.state.page.content;
    if (this.props.state.auth.authenticated) {
      return (
        <div className="ml-auto">
          <span className="auth-span">
            <span className="welcome-tag">{auth.welcome} Back</span>
            <Signout logoutUser={this.logoutUser} />
          </span>
        </div>
      )
    } else {
      return (
        <div className="auth-action-div">
          <span className="auth-span" onClick={() => this.selectAuth("login")}>
            <Button
              disabled={this.state.btnLogin.disabled}
              variant={this.state.btnLogin.clicked ? "warning" : "outline-warning"}
              size="sm" className="auth-tag shadow-none">{auth.login}</Button>
          </span>
          <span className="auth-span" onClick={() => this.selectAuth("signup")}>
            <Button
              disabled={this.state.btnSignup.disabled}
              variant={this.state.btnSignup.clicked ? "warning" : "outline-warning"}
              size="sm" className="auth-tag shadow-none">{auth.signup}</Button>
          </span>
        </div>
      )
    }
  }

  renderLang = () => {
    return (
      <div className="lang-action-div">
        <span className="lang-span" onClick={() => this.selectLang("en")}>
          <Button
            variant={this.state.enLang ? "success" : "outline-success"}
            size="sm" className="lang-btn shadow-none">English</Button>
        </span>
        <span className="lang-span" onClick={() => this.selectLang("es")}>
          <Button
            variant={!this.state.enLang ? "success" : "outline-success"}
            size="sm" className="lang-btn shadow-none">Español</Button>
        </span>
      </div>
    )
  }

  render() {
    const { authForm } = this.state;
    return (
      <Row id="navbar-row">
        <Col id="navbar-container">

          <Navbar expand="md" collapseOnSelect variant="light" id="navbar-element">

            <Col xs={{ order: 4 }} sm={{ order: 4 }} md={{ order: 2 }} className="nav-col">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="nav-links-div">
                  {this.props.state.page.content.navbar.map((link,idx) => this.renderNavLinks(link, idx))}
                  <span className="link-span">
                    <NavDropdown className="lang-tag" title={this.state.enLang ? "EN" : "ES"}>
                      <NavDropdown.Item onClick={() => this.selectLang("en")} className="lang-select">English</NavDropdown.Item>
                      <NavDropdown.Item onClick={() => this.selectLang("es")} className="lang-select">Español</NavDropdown.Item>
                    </NavDropdown>
                  </span>
                </Nav>
              </Navbar.Collapse>
            </Col>

            <Col xs={{ order: 3 }} sm={{ order: 3 }} md={{ order: 4 }} className="auth-col">
              <Container className="auth-action-container">
                <div>{this.renderAuth()}</div>
              </Container>
            </Col>

          </Navbar>

          <Container className="auth-form-container">
            <Collapse in={authForm}>
              <div className="ml-auto">{this.renderForm()}</div>
            </Collapse>
          </Container>

        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(
  connect(mapStateToProps, { loadEnglish, loadSpanish }),
)(Navigation);
