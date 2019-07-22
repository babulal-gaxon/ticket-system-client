import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_USER_INFO_ERROR,
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  INIT_URL, SHOW_MESSAGE,
  SIGNOUT_USER_SUCCESS,
  UPDATE_USER_PERMISSION_DATA,
  USER_DATA,
  USER_TOKEN_SET
} from "../../constants/ActionTypes";
import axios from 'util/Api'
import Permissions from "../../util/Permissions";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const onUserSignUp = ({email, password, first_name, last_name}) => {
  console.info(email, password);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/signup', {
        email: email,
        password: password,
      first_name: first_name, last_name: last_name
      }
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        localStorage.setItem("token", JSON.stringify(data.token.access_token));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        dispatch({type: USER_DATA, payload: data.user});
      } else if (data.message) {
        console.info("payload: data.error", data.message);
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        console.info("payload: data.error", data.errors[0]);
        dispatch({type: FETCH_ERROR, payload: data.errors.email});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onUserSignIn = ({email, password}) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/login', {
        email: email,
        password: password,
      }
    ).then(({data}) => {
      console.info("userSignIn: ", data);
      if (data.success) {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.data));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token});
        dispatch({type: USER_DATA, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.message});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetUserInfo = (history) => {
  console.log("onGetUserInfo");
  return (dispatch) => {
    dispatch({type: FETCH_USER_INFO_START});
    axios.get('/role/permissions',
    ).then(({data}) => {
      console.log("onGetUserInfo: ", data);
      if (data.success) {
        dispatch({type: FETCH_USER_INFO_SUCCESS});
        dispatch({type: UPDATE_USER_PERMISSION_DATA, payload: data.data});
        Permissions.setPermissions(data.data);
        localStorage.setItem("permission", JSON.stringify(data.token));
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
        dispatch({type: FETCH_USER_INFO_ERROR, payload: data.error});
        history.push("/signin");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        history.push("/signin");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type: USER_TOKEN_SET, payload: ''});
        dispatch({type: USER_DATA, payload: null});
        dispatch({type: FETCH_ERROR, payload: error.response.data.message});
        dispatch({type: FETCH_USER_INFO_ERROR, payload: error.response.data.message});
      } else {
        console.log("error: ", JSON.stringify(error));
        dispatch({type: FETCH_ERROR, payload: error.message});
        dispatch({type: FETCH_USER_INFO_ERROR, payload: error.message});
        console.log("Error****:", error.message);
      }
    });
  }
};


export const onUserSignOut = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    setTimeout(() => {
      localStorage.removeItem("token");
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SIGNOUT_USER_SUCCESS});
    }, 2000);
  }
};

export const showErrorMessage = (error) => {
  console.log("error",error)
  if (error.response.status === 401) {
    return ({type: FETCH_ERROR, payload: error.response.data.message});
  } else if (error.response.status === 403) {
    return ({type: FETCH_ERROR, payload: error.response.data.message});
  } else {
    console.log("Error****:", error.message);
    return ({type: FETCH_ERROR, payload: error.message});
  }
};

export const onResetPassword = ({email}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/forgot/password', {
        email: email
      }
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        localStorage.setItem("token", JSON.stringify(data.token.access_token));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        dispatch({type: USER_DATA, payload: data.user});
        dispatch({type:SHOW_MESSAGE, payload: "Reset password link has been successfully sent to your email address"});
      } else if (data.message) {
        console.info("payload: data.error", data.message);
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        console.info("payload: data.error", data.errors[0]);
        dispatch({type: FETCH_ERROR, payload: data.errors.email});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

// export const onVerifyPassword = ({email}) => {
//   return (dispatch) => {
//     dispatch({type: FETCH_START});
//     axios.post('/forgot/password', {
//         email: email
//       }
//     ).then(({data}) => {
//       console.info("data:", data);
//       if (data.success) {
//         localStorage.setItem("token", JSON.stringify(data.token.access_token));
//         axios.defaults.headers.common['access-token'] = "Bearer " + data.token.access_token;
//         dispatch({type: FETCH_SUCCESS});
//         dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
//         dispatch({type: USER_DATA, payload: data.user});
//         dispatch({type:SHOW_MESSAGE, payload: "Reset password link has been successfully sent to your email address"});
//       } else if (data.message) {
//         console.info("payload: data.error", data.message);
//         dispatch({type: FETCH_ERROR, payload: data.message});
//       } else {
//         console.info("payload: data.error", data.errors[0]);
//         dispatch({type: FETCH_ERROR, payload: data.errors.email});
//       }
//     }).catch(function (error) {
//       dispatch({type: FETCH_ERROR, payload: error.message});
//       console.info("Error****:", error.message);
//     });
//   }
// };