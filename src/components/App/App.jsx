import React, { Component, Fragment } from "react";
import { Router, Route,Redirect } from "react-router-dom";
import "./App.css";
import Login from '../Login/Login.jsx';
import Nav from '../Nav/Nav.jsx';
import Main from '../Main/Main';
import { history } from '../../services/history';
import Profile from '../Profile/Profile.jsx';

class App extends Component {
  componentDidMount() {
    this.props.onCheckIsLogin();
  }

  render() {
    return (
      <Router history={history}>
        <Fragment>
          <div data-spy="scroll" data-target="#navbar" data-offset="30">
              <Nav {...this.props}/>
              <Route exact path="/" render={(props)=> {
                console.log(props)
                if(this.props.email) {
                  return (<Redirect to="/profile" />)
                }
                return (
                  <Login
                    {...this.props}
                    onLoginRequest={this.props.onLoginRequest}
                    onLoginSuccess={this.props.onLoginSuccess}
                    onCheckIsLogin={this.props.onCheckIsLogin}
                    {...props}/>
                  );
              }} />
              <Route exact path="/profile" render={(props) => {
                // if(!this.props.email) {
                //   return (<Redirect to="/" />)
                // }
                return (
                  <Fragment>
                    <Profile {...this.props} {...props} />
                  </Fragment>
                );
              }} />
              <Route exact path="/main" render={(props) => {
                if(!this.props.email) {
                  return (<Redirect to="/" />)
                }
                return (
                  <Fragment>
                    <Main {...this.props} {...props} />
                  </Fragment>
                );
              }} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default App;
