import { PROCESS } from "../actions/types";

const initialState = { isProcessing: false };

export default function (state = initialState, action) {
    switch (action.type) {
        case PROCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
