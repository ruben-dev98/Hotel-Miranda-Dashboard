import { createContext } from "react";
<<<<<<< HEAD:src/app/UserContext.jsx
<<<<<<< Updated upstream:src/app/UserContext.jsx
import { UserAuth } from "./UserAuth"
=======
>>>>>>> Stashed changes:src/context/UserContext.jsx
=======
import { UserAuth } from "../app/UserAuth"
>>>>>>> 3f7fe66a24d1fc1542bc0893d1d84afaa8ce123c:src/context/UserContext.jsx
import PropTypes from 'prop-types';
import { useLocalStorage } from "../hook/useLocalStorage";
import { useUserAuth } from "../hook/useUserAuth";

export const UserContext = createContext({ state: {auth: false, user: '', email: ''}, dispatch: () => {}});

export const UserAuthProvider = ({children}) => {
    const initAuth = useLocalStorage('auth', 'get');
    const initUser = JSON.parse(useLocalStorage('user', 'get'));
    const {state, dispatch} = useUserAuth(initAuth ? initAuth === '1' ? true : false : false, initUser ? initUser.user : '', initUser ? initUser.email : '');
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