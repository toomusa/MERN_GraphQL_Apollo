import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../../actions/authActions";
import history from "../../services/history";
import "./style.css";

class Signout extends Component {

    logout() {
        this.props.signout();
        this.props.logoutUser();
        history.push("/");
    }

    render() {
        const { auth } = this.props.state.page.content;
        return (
            <span className="signout-span" onClick={() => this.logout()}>
                <Button variant="warning" size="sm" className="auth-tag shadow-none">{auth.signout}</Button>
            </span>
        )
    }
}


function mapStateToProps(state) {
    return { state };
}

export default compose(
    connect(mapStateToProps, { signout }),
)(Signout);
