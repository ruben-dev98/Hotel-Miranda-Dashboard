
import PropTypes from 'prop-types';

const FormControlComponent = ({label, inputType}) => {

    return (
        <div>
            <label>{label}</label>
            {inputType === 'textarea' ? <textarea></textarea> : <input type={inputType}/>}
        </div>
    );
}

FormControlComponent.propTypes = {
    label: PropTypes.string,
    inputType: PropTypes.string
}

export default FormControlComponent;