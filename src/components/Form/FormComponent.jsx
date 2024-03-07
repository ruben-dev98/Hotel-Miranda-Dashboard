import styled from "styled-components";
import FormControlComponent from "./FormControlComponent";
import PropTypes from 'prop-types';
import DetailsComponent from "../Details/DetailsComponent";

const FormStyled = styled.form`
    
    div {
        margin: 0 auto;
        width: 60%;
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
    }

    button {
        color: #FFF;
        border: 0rem;
        display: block;
        width: 200px;
        height: 100px;
        margin: 40px 35px 0 auto;
        font-family: "Poppins", sans-serif;
        background-color: #135846;
    }
`;

const FormComponent = ( {formControl, data, object__fields, onHandleSubmit} ) => {


    return (
        data ?
        <DetailsComponent data={data} object__fields={object__fields}></DetailsComponent>
        : 
        <FormStyled onSubmit={onHandleSubmit}>
            {
                formControl.map((control, index) => 
                    <FormControlComponent key={index}
                    label={control.label} 
                    inputType={control.input} 
                    name={control.name} 
                    data={control.data}></FormControlComponent>)
            }
            <div>
                <button type="submit">Create</button>
            </div>
        </FormStyled>
    );
}

FormComponent.propTypes = {
    formControl: PropTypes.array,
    data: PropTypes.object,
    object__fields: PropTypes.array,
    onHandleSubmit: PropTypes.func
}

export default FormComponent;