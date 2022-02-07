import { GET_CONTACT, CLEAR_CONTACT } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONTACT:
            return {
                ...state,
                ...action.payload
            };
        case CLEAR_CONTACT:
            return {};
        default:
            return state;
    }
}
