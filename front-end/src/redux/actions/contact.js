import { GET_CONTACT, CLEAR_CONTACT } from "./types";

export const setContact = (contact) => {
    return {
        type: GET_CONTACT,
        payload: contact
    };
};

export const clearContact = () => {
    return {
        type: CLEAR_CONTACT
    };
};
