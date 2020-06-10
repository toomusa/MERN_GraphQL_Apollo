import { AUTH_USER, AUTH_ERROR, LOGOUT_USER } from "../types";
import axios from "axios";

export const signup = (formProps, callback) => async dispatch => {
    try {
        const res = await axios.post("/auth/signup", formProps);
        dispatch({ type: AUTH_USER, payload: res.data.token });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Email in use" });
    }
}

export const login = (formProps, callback) => async dispatch => {
    try {
        console.log(formProps);
        
        const res = await axios.post("/auth/login", formProps);
        console.log(res);
        dispatch({ type: AUTH_USER, payload: res.data.token });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
    }
}

export const signout = () => async dispatch => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch({ type: LOGOUT_USER, payload: {} })
    dispatch({ type: AUTH_USER, payload: "" })
    return;
}

