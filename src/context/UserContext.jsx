import { createContext } from "react";
import { UserAuth } from "../app/UserAuth"
import PropTypes from 'prop-types';
import { useLocalStorage } from "../hook/useLocalStorage";

export const UserContext = createContext({ state: {auth: false, user: '', email: ''}, dispatch: () => {}});

export const UserAuthProvider = ({children}) => {
    const initAuth = useLocalStorage('auth', 'get');
    const initUser = JSON.parse(useLocalStorage('user', 'get'));
    const {state, dispatch} = UserAuth(initAuth ? initAuth === '1' ? true : false : false, initUser ? initUser.user : '', initUser ? initUser.email : '');
    useLocalStorage('auth', 'set', state.auth ? '1' : '0');
    useLocalStorage('user', 'set', JSON.stringify({user: state.user, email: state.email}));
    //

    return (
        <UserContext.Provider value={{state: state, dispatch: dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

UserAuthProvider.propTypes = {
    children: PropTypes.object,
    auth: PropTypes.bool,
    user: PropTypes.string,
    password: PropTypes.string
}