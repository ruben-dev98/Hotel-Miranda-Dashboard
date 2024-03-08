import styled from "styled-components";
import FormControlComponent from "./FormControlComponent";
import PropTypes from 'prop-types';
import DetailsComponent from "../Details/DetailsComponent";
import { ButtonStyled } from "../../styled/ButtonsStyled";
import { useNavigate } from "react-router-dom";

const FormStyled = styled.form`
    
    div {
        margin: 0 auto;
        width: 60%;

        div {
            margin-bottom: 20px;
            
            .rooms{
                width: 200px;
                height: 100px;
            }

            .users {
                width: 80px;
                height: 80px;
            }
        }
    }
    
    label {
        color: #393939;
        display: block;
        margin-bottom: 0.75rem;
    }
    
    input {
        font-family: "Poppins", sans-serif;
        padding: 0rem 1.75rem;
        border: 0em;
        display: block;
        width: 90%;
        background-color: #FFF;
        height: 3.75rem;
        margin-bottom: 0.75rem;
    }

    textarea {
        font-family: "Poppins", sans-serif;
        border: 0rem;
        padding: 1.75rem 1.75rem;
        width: 90%;
        display: block;
        margin-bottom: 0.75rem;
    }

    select {
        font-family: "Poppins", sans-serif;
        border: 0rem;
        padding: 1rem 1.75rem;
        width: 96.3%;
        display: block;
        margin-bottom: 0.75rem;
        background-color: #FFF;
    }

    button {
        display: block;
        width: 200px;
        height: 100px;
        margin: 40px 35px 0 auto;
    }
`;

const FormComponent = ({ formControl, data, object__fields, onHandleSubmit, path }) => {
    const nav = useNavigate();

    return (
        <>
            <ButtonStyled onClick={() => nav(-1)}>Back</ButtonStyled>

            {data && !path.includes('edit') ?
                <DetailsComponent data={data} object__fields={object__fields}></DetailsComponent>
                :  
                <FormStyled onSubmit={onHandleSubmit}>
                    {
                        formControl.map((control, index) =>
                            <FormControlComponent key={index}
                                label={control.label}
                                inputType={control.input}
                                name={control.name}
                                data={control.data} values={data}></FormControlComponent>)
                    }
                    <div>
                        <ButtonStyled type="submit">Create</ButtonStyled>
                    </div>
                </FormStyled>}
        </>
    );
}

FormComponent.propTypes = {
    formControl: PropTypes.array,
    data: PropTypes.object,
    object__fields: PropTypes.array,
    onHandleSubmit: PropTypes.func,
    path: PropTypes.string
}

export default FormComponent;