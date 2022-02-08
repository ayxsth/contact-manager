import {
    USER_LOAD
    // USER_LOADING,
    // AUTH_ERROR,
    // LOGIN_SUCCESS,
    // LOGIN_FAIL,
    // LOGOUT_SUCCESS,
    // REGISTER_SUCCESS,
    // REGISTER_FAILED
} from "./types";

//check token and load user
export const authUser = (payload) => {
    return {
        type: USER_LOAD,
        payload
    };
};
