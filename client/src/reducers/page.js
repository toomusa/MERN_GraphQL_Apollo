import { LOAD_EN, LOAD_ES, PAGE_ERROR } from "../actions/types";
import content from "../static/content";

const INITIAL_STATE = {
    content: content.en
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOAD_EN:
            return {...state, content: action.payload};
        case LOAD_ES:
            return {...state, content: action.payload};
        case PAGE_ERROR:
            return {...state, content: content.en};
        default:
            return state;
    }
}


