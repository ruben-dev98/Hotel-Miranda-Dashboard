import { Navigate, useNavigate } from "react-router-dom";
import { FormEvent, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FormStyledLogin } from "../styled/FormStyled";
import { ButtonStyled } from "../styled/ButtonStyled";
import { loginInApi } from "../helpers/loginInApi";
import { IconImgStyled } from "../styled/IconStyled";

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
        if(employee) {
            dispatch({type: 'login', payload: {auth: true, user: employee.user, email: employee.email, token: employee.token}});
            navigate('/');
        }
    }

    return (
        state.auth ? 
        <Navigate to='/' replace/> 
        :
        <FormStyledLogin onSubmit={onSubmitHandle}>
            <IconImgStyled src="/icon.png"/>
            <div>
                <label>Username</label>
                <input type="text" defaultValue={'ruben.dopico.dev@gmail.com'} name="user" placeholder="ruben.dopico.dev@gmail.com"/>
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