import React, { Component } from "react";
import { NavLink } from"react-router-dom";
import "./Nav.css";

class Nav extends Component {
  componentDidMount() {

  }
  onLogOut(){
    this.props.onLogout()
  }


  render() {
    return (
            <div className="nav-menu fixed-top">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <nav className="navbar navbar-dark navbar-expand-lg is-scrolling">
                      <a className="navbar-brand" href="/">ㄱ ㅐ모임</a> <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon" /> </button>
                      {
                        this.props.displayname &&
                        (
                          <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav ml-auto">
                              <li className="nav-item"> <NavLink className="nav-link" activeClassName="active" exact to="/profile">프로필</NavLink> </li>
                              <li className="nav-item"> <NavLink className="nav-link" activeClassName="active" exact to="/main">산책친구찾기</NavLink></li>
                              <li className="nav-item"> <NavLink className="nav-link" activeClassName="active" exact to="/record">산책기록</NavLink></li>
                              <li className="nav-item" onClick={this.onLogOut.bind(this)}><a href="/" className="btn btn-outline-light my-3 my-sm-0 ml-lg-3">Logout</a></li>
                            </ul>
                          </div>
                        )
                      }
                    </nav>
                  </div>
                </div>
              </div>
            </div>
    );
  }
}

export default Nav;
