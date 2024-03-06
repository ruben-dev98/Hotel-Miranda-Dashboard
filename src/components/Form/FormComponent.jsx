import styled from "styled-components";
import FormControlComponent from "./FormControlComponent";
import PropTypes from 'prop-types';

const FormStyled = styled.form`

`;

const FormComponent = ( {formControl, data, object__fields} ) => {


    return (
        data ?
        <ul>
            {object__fields.map((field, index) => <li key={index}>{data[field]}</li>)}
        </ul>
        : 
        <form>
            {formControl.map((control, index) => <FormControlComponent key={index} label={control.label} inputType={control.input}></FormControlComponent>)}
        </form>
    );
}

FormComponent.propTypes = {
    formControl: PropTypes.array,
    data: PropTypes.object,
    object__fields: PropTypes.array
}

export default FormComponent;