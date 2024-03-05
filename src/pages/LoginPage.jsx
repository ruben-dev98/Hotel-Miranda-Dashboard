import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const LoginPage = ({auth, setAuth}) => {
    
    if(auth) {
        return <Navigate to={'/'} replace/>
    }

    const onSubmitHandle = (event) => {
        event.preventDefault();
        if(event.target.user.value === 'user' && event.target.password.value === 'admin') {
            setAuth(true);
        }
        return <Navigate to={'/'} replace/>
    }

    return (
        <form onSubmit={onSubmitHandle}>
            <label>Username</label>
            <input type="text" name="user"/>
            <label>Password</label>
            <input type="password" name="password"/>
            <input type="submit" value="Login"/>
        </form>
    );

}

LoginPage.propTypes = {
    auth: PropTypes.bool,
    setAuth: PropTypes.func
}

export default LoginPage;