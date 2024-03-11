import { useReducer } from "react";

const reducer = (state, action) => {
    switch(action.type) {
        case 'login':
        return {
            auth: true,
            user: action.payload.user,
            password: action.payload.password
        }
        case 'logout':
            return {
            auth: false,
            user: '',
            password: ''
        }
    }
}

export const UserAuth = (isAuth, user, password) => {
    const [state, dispatch] = useReducer(reducer, {auth: isAuth, user: user, password: password});

    return {state, dispatch} ;
}