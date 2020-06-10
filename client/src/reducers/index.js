import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import page from "./page";

export default combineReducers({
    auth,
    page,
    form
})
