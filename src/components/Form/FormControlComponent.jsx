
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const renderSwitch = (inputType, data, name, values) => {
    switch (inputType) {
        case 'textarea':
            return <textarea defaultValue={values ? values[name] : ''} rows={5} name={name}></textarea>
        case 'select':
            return (<select defaultValue={values ? values[name] : ''} name={name}>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        case 'select multiple':
            return (<select defaultValue={values ? values[name] : []} name={name} multiple>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        default:
                if(inputType == 'date') {
                    const date = new Date(values ? values[name] : '');
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    return <input defaultValue={values ? `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}` : undefined} name={name} type={inputType} />
                }
            return <input defaultValue={values ? values[name] : ''} name={name} type={inputType} />
    }
}

const FormControlComponent = ({ label, inputType, name, data = [], values }) => {
    const loc = useLocation().pathname;
    return (
        <div>
            
                {name === 'foto' && values && 
                    <div>
                        <img src={values[name]} ></img>
                    </div>    
                }
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