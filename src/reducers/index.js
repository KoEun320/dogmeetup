import { combineReducers } from "redux";
import authentication from "./authentication";
import dogs from "./dogs";

//컨바인 Reducer는 파일 이름을 키값으로 설정한다. 즉 autentication: {displayname: "" , email: ""}
export default combineReducers({
  authentication: authentication,
  dogs : dogs
});
