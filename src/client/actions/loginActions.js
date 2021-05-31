import axios from "axios";
//import store from '../../../Store';
import deviceStorage from "./deviceStorege";
import SweetAlert from "react-native-sweet-alert";
import { Alert } from "react-native";
// action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOGOUT_USER = "LOGOUT_USER";
import AsyncStorage from "@react-native-community/async-storage";
import { baseURL } from "../constants";

// action creators
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
export const loginSuccess = (loginData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: loginData,
  };
};

export const loginFailure = (errMsg) => {
  return {
    type: LOGIN_FAILURE,
    payload: errMsg,
  };
};

// save the auth token to redux store
export const setAuthToken = (authToken) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: authToken,
  };
};
export const setCurrentUser = (userId) => {
  return {
    type: SET_CURRENT_USER,
    payload: userId,
  };
};

export const clearAppData = () => {
  return async function () {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error clearing app data.");
    }
  };
};

export const logout = () => {
  return function (dispatch) {
    // setAuthenticationToken(false);
    dispatch(setCurrentUser({}));

    dispatch({
      type: LOGOUT_USER,
    });
  };
};

// async impure action creator enabled by redux-thunk
export const login = (loginData) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios({
      method: "post",
      url: "/login",
      baseURL: baseURL,

      data: {
        email: loginData.email,
        password: loginData.password,
      },
    })
      .then((res) => {
        if (res.data.value) {
          dispatch(loginSuccess(res.data));
        } else {
          dispatch(loginFailure(res.data.message));
        }
      })

      .catch((err) => {
       

        dispatch(loginFailure(err.response.data.message));
        
      });
  };
};
