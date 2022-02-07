import { combineReducers } from "redux";
// import auth from "./auth";
// import error from "./error";
import contacts from "./contacts";
import contact from "./contact";

const rootReducer = combineReducers({
    // auth,
    // error,
    contacts,
    contact
});

export default rootReducer;
