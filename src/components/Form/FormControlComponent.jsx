
import PropTypes from 'prop-types';

const renderSwitch = (inputType, data, name, values) => {
    switch (inputType) {
        case 'textarea':
            return <textarea rows={5} name={name}>{values[name] ? values[name] : ''}</textarea>
        case 'select':
            return (<select name={name} value={values[name] ? values[name] : undefined}>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        case 'select multiple':
            return (<select value={values[name] ? values[name] : undefined} name={name} multiple>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        default:
            return <input value={values[name] ? values[name] : undefined} name={name} type={inputType} />
    }
}

const FormControlComponent = ({ label, inputType, name, data = [], values }) => {


    return (
        <div>
            <label>{label}</label>
            {
                renderSwitch(inputType, data, name, values)
            }
        </div>
    );
}

FormControlComponent.propTypes = {
    label: PropTypes.string,
    inputType: PropTypes.string,
    data: PropTypes.array,
    name: PropTypes.string,
    values: PropTypes.object
}

export default FormControlComponent;