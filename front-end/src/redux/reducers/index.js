import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import contacts from "./contacts";
import contact from "./contact";
import user from "./user";

const rootReducer = combineReducers({
    auth,
    error,
    contacts,
    contact,
    user
});

export default rootReducer;
