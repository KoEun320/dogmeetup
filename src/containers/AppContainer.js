import { connect } from "react-redux";
import App from "../components/App/App";

import { updateInitialSettingAction } from "./../actions";

const mapStateToProps = ({ initialStatus }) => {
  return {
    initialStatus
  };
};

const mapDispatchToProps = dispatch => ({
  updateInitialSetting: test => {
    dispatch(updateInitialSettingAction(test));
  }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
