
import PropTypes from 'prop-types';

const FormControlComponent = ({label, inputType}) => {


    return (
        <>
            <label>{label}</label>
            <input type={inputType}/>
        </>
    );
}

FormControlComponent.propTypes = {
    label: PropTypes.string,
    inputType: PropTypes.string
}

export default FormControlComponent;