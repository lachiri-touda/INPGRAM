import axios from "axios";
//import store from '../../../Store';
import deviceStorage from "./deviceStorege";
import { baseURL } from "../constants";

export const listUsers = () => {
  axios({
    method: "post",
    url: "/listUsers",
    baseURL: baseURL,
  })
    .then((res) => {
      return res.data.lista;
    })

    .catch((err) => {
      console.log(err.message);
    });
};

// async impure action creator enabled by redux-thunk
