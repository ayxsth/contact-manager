import { PROCESS } from "./types";

export const setProcess = (payload) => {
    return {
        type: PROCESS,
        payload
    };
};
