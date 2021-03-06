import axios from "axios";
import { toast } from "react-toastify";
import {ToastObjects} from "../../util/toastObject";
import {UserConstants} from "../constants";


const {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_SUCCESS_RESET,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} = UserConstants;



// Register
export const Register = (firstName, lastName, email, password) => async (dispatch) => {

  try {
    dispatch({ type: USER_REGISTER_REQUEST });    

    const { data } = await axios.post(
      `auth/signup`,
      { firstName, lastName, email, password }
    );

    if (!data.success) {
      toast.error(data.message, ToastObjects);
      dispatch({
        type: USER_REGISTER_FAIL,
      });
    } else {
      toast.success(data.message, ToastObjects);
      dispatch({ type: USER_REGISTER_SUCCESS});
    }
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    toast.error(message, ToastObjects);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: message,
    });
  }
};

// Register Reset
export const RegisterReset = () => (dispatch) => {
  dispatch({ type: USER_REGISTER_SUCCESS_RESET });
};

  
// Login
export const Login = (email, password) => async (dispatch) => {
  
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
    hideProgressBar: true,
  };
  
  try {
    dispatch({ type: USER_LOGIN_REQUEST });    

    const response = await axios.post(
      `auth/signin`,
      { email, password }
    );    

    let responseData = response.data;

    if (!responseData.success){      
      toast.error(responseData.message, ToastObjects);      
      dispatch({
        type: USER_LOGIN_FAIL,
      });
    } else {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: responseData });
      localStorage.setItem("userPanelInfo", JSON.stringify(responseData));
    }
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    toast.error(message, ToastObjects);
    
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("userPanelInfo");
  dispatch({ type: USER_LOGOUT });
};