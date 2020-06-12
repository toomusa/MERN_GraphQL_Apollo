import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import page from "./page";
import graph from "./graph";

export default combineReducers({
    auth,
    page,
    graph,
    form
})
