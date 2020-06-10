import { LOAD_EN, LOAD_ES, PAGE_ERROR } from "../types";

export const loadEnglish = content => async dispatch => {
    try {
        dispatch({ type: LOAD_EN, payload: content });
    } catch (e) {
        dispatch({ type: PAGE_ERROR, payload: "Error loading English content" });
    }
}

export const loadSpanish = content => async dispatch => {
    try {
        dispatch({ type: LOAD_ES, payload: content });
    } catch (e) {
        dispatch({ type: PAGE_ERROR, payload: "Error loading Spanish content" });
    }
}
