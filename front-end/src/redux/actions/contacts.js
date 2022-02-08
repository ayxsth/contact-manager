import { GET_CONTACTS, CLEAR_CONTACTS } from "./types";

export const setContacts = (contacts) => {
    return {
        type: GET_CONTACTS,
        payload: contacts
    };
};

export const getContacts = () => {
    return {
        type: GET_CONTACTS
    };
};

export const clearContacts = () => {
    return {
        type: CLEAR_CONTACTS
    };
};
