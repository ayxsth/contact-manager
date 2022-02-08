import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                ...action.payload
            };
        case LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
}
