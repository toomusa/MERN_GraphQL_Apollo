import { LOG_WORK } from "../actions/types";

const INITIAL_STATE = {
    logs: []
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOG_WORK:
            return { ...state, logs: action.payload };
        default:
            return state;
    }
}