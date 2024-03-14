import FormControlComponent from "./FormControlComponent";
import PropTypes from 'prop-types';
import { ButtonStyled } from "../../styled/ButtonsStyled";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftStyled } from "../../styled/IconStyled";
import { FormStyledComponent } from "../../styled/FormStyled";



const FormComponent = ({ formControl, data, onHandleSubmit}) => {
    const nav = useNavigate();

    return (
        <>
            <ButtonStyled onClick={() => nav(-1)}>
                <FaArrowLeftStyled />
            </ButtonStyled>
            <FormStyledComponent onSubmit={onHandleSubmit}>
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
            </FormStyledComponent>
        </>
    );
}

FormComponent.propTypes = {
    formControl: PropTypes.array,
    data: PropTypes.object,
    onHandleSubmit: PropTypes.func
}

export default FormComponent;