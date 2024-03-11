import { createContext } from "react";
import { UserAuth } from "./UserAuth"
import PropTypes from 'prop-types';
import { useLocalStorage } from "../hook/useLocalStorage";

export const UserContext = createContext({ state: {auth: false, user: '', password: ''}, dispatch: () => {}});

export const UserAuthProvider = ({children}) => {
    const auth = useLocalStorage('auth', 'get');
    const user = JSON.parse(useLocalStorage('user', 'get'));
    const {state, dispatch} = UserAuth(auth ? auth === '1' ? true : false : false, user ? user.user : '', user ? user.password : '');
    useLocalStorage('auth', 'set', state.auth ? '1' : '0');
    useLocalStorage('user', 'set', JSON.stringify({user: state.user, password: state.password}));

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