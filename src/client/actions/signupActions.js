import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
//import swal from "sweetalert";
import { tokenConfig } from "./AuthActions";
// action types
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
import { baseURL } from "../constants";

// action creators
export const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};
export const signupSuccess = (signupData) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: signupData,
  };
};
export const signupFailure = (errMsg) => {
  return {
    type: SIGNUP_FAILURE,
    payload: errMsg,
  };
};

// async impure action creator enabled by redux-thunk
export const signup = (signupData) => {
  return (dispatch) => {
    dispatch(signupRequest());
    
    axios({
      method: "post",
      url: "/register",
      baseURL: baseURL,
      data: {
        name: signupData.name,
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
      },

      headers: {
        "auth-token": AsyncStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.data.value) {
          dispatch(signupSuccess(signupData));
        } else {
          
          dispatch(signupFailure(res.data.message));
        }
      })
      .catch((err) => {
      
        dispatch(signupFailure(err.response.data.message));
      });
  };
};
