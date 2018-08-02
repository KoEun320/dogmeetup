import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./Login.css";
import { withRouter } from 'react-router-dom';

class Login extends Component {
  onLogin(){
    this.props.onLoginRequest();
  }

  render() {
    return (
    <div className="login" onClick={this.onLogin.bind(this)}>
      <img className="_5aqp _5aqr img" src="https://scontent-icn1-1.xx.fbcdn.net/v/t39.2365-6/18928641_251957295286418_4362086450741641216_n.png?_nc_cat=0&oh=96b2909091a5a140a6846aada6e4db93&oe=5BDAFA05" alt="Facebook_login" width={300} />
    </div>
    );
  }
}

export default withRouter(Login);

Login.propTypes = {
  onLoginRequest : PropTypes.func
};
