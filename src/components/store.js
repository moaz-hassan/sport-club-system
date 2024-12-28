import { createStore } from "redux";


// Initial state
const initialState = {
  resObj: {},
  signUpOtp: false,
  resetPassOtp: false,
  userInfo: {},
};


// Reducer function
function reducer(state = initialState, action) {
  // console.log(state);
  
  switch (action.type) {
    case "signUpOtp":
      return {
        ...state,
        signUpOtp: action.payload,
      };
    case "resetPassOtp":
      return {
        ...state,
        resetPassOtp: action.payload,
      };
    case "resObj":
      return {
        ...state,
        resObj: action.payload,
      };
    case "userInfo":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}

// Create Redux store
const store = createStore(reducer);

export default store;
