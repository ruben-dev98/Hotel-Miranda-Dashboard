import { Navigate, useNavigate } from "react-router-dom";
import { FormEvent, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FormStyledLogin } from "../styled/FormStyled";
import { ButtonStyled } from "../styled/ButtonStyled";
import { loginInApi } from "../helpers/loginInApi";

interface FormData extends EventTarget {
    user: HTMLFormElement,
    password: HTMLFormElement
}

const LoginPage = () => {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);
    const onSubmitHandle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const element = event.target as FormData;
        const employee = await loginInApi(element.user.value, element.password.value);
        if(employee.email) {
            dispatch({type: 'login', payload: {auth: true, user: employee.full_name, email: employee.email, token: employee.token}});
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
                <input type="text" defaultValue={'Muhammad3@yahoo.com'} name="user" placeholder="Muhammad3@yahoo.com"/>
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