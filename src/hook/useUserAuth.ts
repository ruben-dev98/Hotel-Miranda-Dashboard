import { useReducer } from "react";

export interface UserAuthState {
    auth: boolean,
    user: string,
    email: string
}

export interface UserAuthActions {
    type: 'login' | 'logout' | 'edit',
    payload: UserAuthState
}

interface useUserAuthProps {
    isAuth: boolean,
    user: string,
    email: string
}

const reducer = (state: UserAuthState, action: UserAuthActions) => {
    switch(action.type) {
        case 'login':
        return {
            ...state,
            auth: true,
            user: action.payload?.user,
            email: action.payload?.email
        }
        case 'logout':
            return {
            ...state,
            auth: false,
            user: '',
            email: ''
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


export const useUserAuth = ({isAuth, user, email}: useUserAuthProps)  => {
    const [state, dispatch] = useReducer(reducer, {auth: isAuth, user: user, email: email});

    return {state, dispatch};
}