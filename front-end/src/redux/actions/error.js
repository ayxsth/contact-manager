import { GET_ERROR, CLEAR_ERROR } from "./types";

//return errors
export const getError = (payload) => {
    return {
        type: GET_ERROR,
        payload
    };
};

//clear errors
export const clearError = () => {
    return {
        type: CLEAR_ERROR
    };
};
