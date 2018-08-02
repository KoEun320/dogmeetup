import {LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_CHECK, DOGSLISTBYUSER, GET_LOCATION, AllDOGSLIST } from "../constants";


export const loginSuccess = ({ displayName, email, uid }) => {
  return {
    type: LOGIN_SUCCESS,
    displayName,
    email,
    uid
  };
}

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const loginFailure = ({error}) => {
  return {
    type: LOGIN_FAILURE,
    error
  }
}

export const checkIsLogin = () => {
  return {
    type: LOGIN_CHECK
  }
}

export const getDogsListbyUser = (dogslist) => {
  return {
    type: DOGSLISTBYUSER,
    dogslist
  }
}

export const getUserLocation = (location) => {
  return {
    type: GET_LOCATION,
    location
  }
}

export const getAllDogsList = (allDogList) => {
  return {
    type: AllDOGSLIST,
    allDogList
  }
}
