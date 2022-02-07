import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT } from "./types";

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
