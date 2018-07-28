import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import logger from "redux-logger";
import AppContainer from "./containers/AppContainer";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import './services/firebase';
import "./index.css";

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
