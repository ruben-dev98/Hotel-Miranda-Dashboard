import { useReducer } from "react";

const reducer = (state, action) => {
    switch(action.type) {
        case 'login':
        return {
            ...state,
            auth: true,
            user: action.payload.user,
            email: action.payload.email
        }
        case 'logout':
            return {
            ...state,
            auth: false,
            user: '',
            password: ''
        }
        case 'edit': {
            return {
                ...state,
                user: action.payload.user,
                email: action.payload.email
            }
        }
    }
}

export const UserAuth = (isAuth, user, email) => {
    const [state, dispatch] = useReducer(reducer, {auth: isAuth, user: user, email: email});

    return {state, dispatch};
}