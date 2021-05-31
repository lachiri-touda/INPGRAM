import {
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  EDIT_POST,
  MODIFY_POST,
  DISPLAY_LIKES
} from "../actions/postsActions";

// init state for signup
const initState = {
  isLoading: false,
  isUpoaded: false,
  isModified: false,
  Data: {},
  errMsg: "",
  postdata: {},
  likesdata: {},
};

// the sign up reducer
const postsReducer = (state = initState, action) => {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPLOAD_SUCCESS:
      return {
        isLoading: false,
        isUploaded: true,
        Data: action.payload,
        errMsg: "",
      };
    case EDIT_POST:
      return {
        postdata: action.payload,
        errMsg: "",
      };
    case MODIFY_POST:
      return {
        postdata: action.payload,
        isModified: true,
        errMsg: "",
      };
    case UPLOAD_FAILURE:
      return {
        isLoading: false,
        isUploaded: false,
        Data: {},
        errMsg: action.payload,
      };
      case DISPLAY_LIKES:
      return {
        likesdata: action.payload,
        errMsg: "",
      };
    default:
      return state;
  }
};

export default postsReducer;
