import { Dispatch, ReactNode, createContext } from "react";
import { useLocalStorage } from "../helpers/useLocalStorage";
import { UserAuthActions, UserAuthState, useUserAuth } from "../hook/useUserAuth";
import { localStorageAuthKey, localStorageGetAction, localStorageSetAction, localStorageTokenKey, localStorageUserKey } from "../helpers/constants";

interface UserAuthProviderProps {
    children?: ReactNode
}

interface UserContextInit {
    state: UserAuthState,
    dispatch: Dispatch<UserAuthActions>
}

interface InitUser {
    user: string,
    email: string
}

export const UserContext = createContext<UserContextInit>({ state: { auth: false, user: '', email: '', token: '' }, dispatch: ()  => { } });

export const UserAuthProvider = ({ children } : UserAuthProviderProps) => {
    const initAuth = useLocalStorage({key: localStorageAuthKey, action: localStorageGetAction});
    const initUser: InitUser = JSON.parse(useLocalStorage({key: localStorageUserKey, action: localStorageGetAction}) || '{}');
    const token: string = useLocalStorage({key: localStorageTokenKey, action: localStorageGetAction}) || '';
    const { state, dispatch } = useUserAuth({isAuth: initAuth === '1' ? true : false, user: initUser ? initUser.user : '', email: initUser ? initUser.email : '', token: token ? token : ''});
    useLocalStorage({key: localStorageAuthKey, item: state.auth ? '1' : '0', action: localStorageSetAction});
    useLocalStorage({key: localStorageUserKey, item: JSON.stringify({ user: state.user, email: state.email }), action: localStorageSetAction});
    useLocalStorage({key: localStorageTokenKey, item: state.token, action: localStorageSetAction });

    return (
        <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
            {children}
        </UserContext.Provider>
    )
}