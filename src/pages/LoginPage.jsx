import { Navigate, useNavigate } from "react-router-dom";
import { ButtonStyled } from "../styled/ButtonsStyled";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FormStyledLogin } from "../styled/FormStyled";

const LoginPage = () => {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);
    const onSubmitHandle = (event) => {
        event.preventDefault();
        if(event.target.user.value === 'user' && event.target.password.value === 'admin') {
            dispatch({type: 'login', payload: {user: 'Ruben Dopico Novo', email: 'rdn998@gmail.com'}});
            navigate('/');
        }
        
    }

    return (
        state.auth ? 
        <Navigate to='/' replace/> 
        :
        <FormStyledLogin onSubmit={onSubmitHandle}>
            <div>
                <label>Username</label>
                <input type="text" defaultValue={'user'} name="user" placeholder="user"/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" defaultValue={'admin'} name="password" placeholder="admin"/>
            </div>
            <div>
                <ButtonStyled type="submit">Login</ButtonStyled>
            </div>
        </FormStyledLogin>
    );

}

export default LoginPage;