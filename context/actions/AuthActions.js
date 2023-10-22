import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseUrl from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_LOADING = "SET_LOADING";

//function to log in the user

export const loginUser = (user, dispatch) => {

  fetch(`${baseUrl}user/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Network response was not ok.");
    }
  } ).then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, data));
      } else {
        logoutUser(dispatch)
      }
    })
    .catch((err) => {
      console.log(err);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: "",
      });
      dispatch(setLoading(false))
      logoutUser(dispatch)
    })
};

//Getting the user's profile
export const getUserProfile = (id) => {
  fetch(`${baseUrl}user/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data
    });
}

//logging out
export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem('jwt');
    dispatch(setCurrentUser({}));
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}

export  const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading
  }
}