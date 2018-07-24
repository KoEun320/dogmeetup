import React, { Component } from "react";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.updateInitialSetting("this is test");
  }

  render() {
    return <div className="App">Food In The Hood, 우리동네 푸드트럭!</div>;
  }
}

export default App;
