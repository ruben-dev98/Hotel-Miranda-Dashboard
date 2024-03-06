import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import styled from "styled-components";

const FormStyled = styled.form`
    padding: 4rem;
    width: 50%;
    margin: 200px auto 0 auto;
    box-shadow: 10px 10px 10px 10px #135846;

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
        font-family: "Poppins", sans-serif;
        display: block;
        margin: 0 0 0 auto;
        border-radius: 20px;
        width: 100px;
        height: 50px;
        border: 0rem;
        background-color: #135846;
        color: #FFF;
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
                <input type="text" name="user"/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </FormStyled>
    );

}

LoginPage.propTypes = {
    auth: PropTypes.bool,
    setAuth: PropTypes.func
}

export default LoginPage;