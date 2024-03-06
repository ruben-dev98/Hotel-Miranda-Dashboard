
import PropTypes from 'prop-types';

const renderSwitch = (inputType, data, name) => {
    switch(inputType) {
        case 'textarea':
            return <textarea rows={5} name={name}></textarea>
        case 'select':
            return (<select name={name}>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        default:
            return <input name={name} type={inputType}/> 
    }
}

const FormControlComponent = ({label, inputType, name, data = []}) => {
    
    
    return (
        <div>
            <label>{label}</label>
            {
                renderSwitch(inputType, data, name)
            }
        </div>
    );
}

FormControlComponent.propTypes = {
    label: PropTypes.string,
    inputType: PropTypes.string,
    data: PropTypes.array,
    name: PropTypes.string
}

export default FormControlComponent;