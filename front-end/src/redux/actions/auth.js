import axios from "axios";
import { returnErrors } from "./error";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from "../types";

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING });

    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    //if token, add the headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    axios
        .post("/signin", config)
        .then((res) =>
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        )
        .catch((err) => {
            dispatch(returnErrors(err.res.data, err.res.status));
            dispatch({ type: AUTH_ERROR });
        });
};
