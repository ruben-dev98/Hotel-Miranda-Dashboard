import { createContext } from "react";
import { UserAuth } from "./UserAuth"
import PropTypes from 'prop-types';

export const UserContext = createContext({ state: {auth: false, user: '', password: ''}, dispatch: () => {}});

export const UserAuthProvider = ({children, auth, user, password}) => {
    const {state, dispatch} = UserAuth(auth, user, password);
    

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