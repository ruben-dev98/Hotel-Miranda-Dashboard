import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import styled from "styled-components";
import { ButtonStyled } from "../styled/ButtonsStyled";

const FormStyled = styled.form`
    padding: 4rem;
    width: 50%;
    margin: 200px auto 0 auto;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    div {
        width: 60%;
        margin: 0 auto 2rem auto;
    }

    label {
        display: block;
        font-size: 1.5rem;
        margin-bottom: 1.25rem;
    }

    input {
        font-family: "Poppins", sans-serif;
        width: 100%;
        height: 1rem;
        padding: 2rem;
        display: block;
        font-size: 1.5rem;
    }

    button {
        display: block;
        margin: 0 0 0 auto;
    }

`;

const LoginPage = ({auth, setAuth}) => {
    const navigate = useNavigate();

    const onSubmitHandle = (event) => {
        event.preventDefault();
        if(event.target.user.value === 'user' && event.target.password.value === 'admin') {
            setAuth(true);
        }
        navigate('/');
    }

    return (
        auth ? 
        <Navigate to='/' replace/> 
        :
        <FormStyled onSubmit={onSubmitHandle}>
            <div>
                <label>Username</label>
                <input type="text" name="user" placeholder="user"/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" placeholder="admin"/>
            </div>
            <div>
                <ButtonStyled type="submit">Login</ButtonStyled>
            </div>
        </FormStyled>
    );

}

LoginPage.propTypes = {
    auth: PropTypes.bool,
    setAuth: PropTypes.func
}

export default LoginPage;