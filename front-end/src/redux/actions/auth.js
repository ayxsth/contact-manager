import { USER_LOAD } from "./types";

//check token and load user
export const authUser = (payload) => {
    return {
        type: USER_LOAD,
        payload
    };
};
