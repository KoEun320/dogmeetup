import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_CHECK, LOGOUT, GET_LOCATION } from "../constants";

export  default function authentication(state = {}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        displayname: action.displayName,
        email: action.email,
        uid: action.uid
      };
    case LOGIN_FAILURE:
      return {
        error: action.error
      };
    case LOGIN_CHECK:
      return {
      };
    case LOGOUT:
      return {};

    case GET_LOCATION:
      return {
        ...state,
        latitude : action.location.latitude,
        longitude: action.location.longitude
      };

    default:
      return state
  }
}
