import { Dispatch, ReactElement, createContext } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { UserAuthActions, UserAuthState, useUserAuth } from "../hook/useUserAuth";

interface UserAuthProviderProps {
    children: ReactElement
}

interface UserContextInit {
    state: UserAuthState,
    dispatch: Dispatch<UserAuthActions>
}

interface InitUser {
    user: string,
    email: string
}

export const UserContext = createContext<UserContextInit>({ state: { auth: false, user: '', email: '' }, dispatch: ()  => { } });

export const UserAuthProvider = ({ children } : UserAuthProviderProps) => {
    const initAuth = useLocalStorage({key: 'auth', action: 'get'});
    const initUser: InitUser = JSON.parse(useLocalStorage({key: 'user', action: 'get'}) || '');
    const { state, dispatch } = useUserAuth({isAuth: initAuth === '1' ? true : false, user: initUser ? initUser.user : '', email: initUser ? initUser.email : ''});
    useLocalStorage({key: 'auth', action: 'set', item: state.auth ? '1' : '0'});
    useLocalStorage({key: 'user', action: 'set', item: JSON.stringify({ user: state.user, email: state.email })});
    //

    return (
        <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
            {children}
        </UserContext.Provider>
    )
}