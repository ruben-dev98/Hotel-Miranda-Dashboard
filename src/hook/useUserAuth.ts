import { useReducer } from "react";

export interface UserAuthState {
    auth: boolean,
    user: string,
    email: string,
    token: string
}

export interface UserAuthActions {
    type: 'login' | 'logout' | 'edit',
    payload: UserAuthState
}

interface useUserAuthProps {
    isAuth: boolean,
    user: string,
    email: string
    token: string
}

const reducer = (state: UserAuthState, action: UserAuthActions) => {
    switch(action.type) {
        case 'login':
        return {
            ...state,
            auth: true,
            user: action.payload?.user,
            email: action.payload?.email,
            token: action.payload?.token
        }
        case 'logout':
            return {
            ...state,
            auth: false,
            user: '',
            email: '',
            token: ''
        }
        case 'edit': {
            return {
                ...state,
                user: action.payload?.user,
                email: action.payload?.email
            }
        }
    }
}


export const useUserAuth = ({isAuth, user, email, token}: useUserAuthProps)  => {
    const [state, dispatch] = useReducer(reducer, {auth: isAuth, user: user, email: email, token: token});

    return {state, dispatch};
}