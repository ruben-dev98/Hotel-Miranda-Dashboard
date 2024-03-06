import FormControlComponent from "./FormControlComponent";
import PropTypes from 'prop-types';


const FormComponent = ( {formControl} ) => {


    return (
        <form>
            {formControl.map((control, index) => <FormControlComponent key={index} label={control.label} inputType={control.input}></FormControlComponent>)}
        </form>
    );
}

FormComponent.propTypes = {
    formControl: PropTypes.object
}

export default FormComponent;