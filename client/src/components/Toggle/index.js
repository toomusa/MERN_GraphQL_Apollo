import { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";

class Toggle extends Component {

  state = {
    on: false
  }
   
  toggle = () => {
    this.setState({
      on: !this.state.on
    })
  }

  render() {
    const { children } = this.props;
    return children({
      on: this.state.on,
      toggle: this.toggle,
      addNewItem: this.addNewItem
    })
  }
}

function mapStateToProps() {
  return {};
}

export default compose(
  connect(mapStateToProps, {}),
)(Toggle);
