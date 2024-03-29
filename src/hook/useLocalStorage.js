import { useReducer } from "react";

const reducer = (key, item, action) => {
    switch(action) {
        case 'set':
            localStorage.setItem(key, item);
            return null;
        case 'get':
            return localStorage.getItem(key) ? localStorage.getItem(key) : null;
    }
}

export const useLocalStorage = (key, action, item = null) => {
    const [localState, localDispatch] = useReducer(reducer, {key: item});
    return reducer(key, item, action);
}