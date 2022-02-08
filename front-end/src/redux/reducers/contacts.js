import { GET_CONTACTS, CLEAR_CONTACTS } from "../actions/types";

const initialState = {
    contacts: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            };
        case CLEAR_CONTACTS:
            return {};
        default:
            return state;
    }
}
