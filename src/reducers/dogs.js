import { DOGSLISTBYUSER, AllDOGSLIST } from "../constants";
var initialState ={
  dogslist:[],
  alldogslist: []
}

export default function dogs(state = initialState, action) {
  switch (action.type) {
    case DOGSLISTBYUSER:
      return {
        ...state,
        dogslist: action.dogslist
      };
    case AllDOGSLIST:
      return {
        ...state,
        alldogslist: action.allDogList
      };
    default:
      return state
  }
}
