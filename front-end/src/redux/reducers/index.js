import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import contacts from "./contacts";
import contact from "./contact";
import user from "./user";
import process from "./process";

const rootReducer = combineReducers({
    auth,
    error,
    contacts,
    contact,
    user,
    process
});

export default rootReducer;
