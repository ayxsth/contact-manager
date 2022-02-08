import { USER_LOAD } from "../actions/types";

const initialState = {
    isAuthenticated: false
};

const auth = function (state = initialState, action) {
    switch (action.type) {
        case USER_LOAD:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default auth;
