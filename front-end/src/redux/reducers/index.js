import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import contacts from "./contacts";
import contact from "./contact";
import process from "./process";

const rootReducer = combineReducers({
    auth,
    error,
    contacts,
    contact,
    process
});

export default rootReducer;
