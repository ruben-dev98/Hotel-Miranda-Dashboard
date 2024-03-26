
import { iBooking, iEmployee, iRoom } from '../../entitys/Data';

interface RenderProps {
    inputType: string,
    data: Array<string>,
    name: 'id' | 'full_name' | 'order_date' | 'check_in' | 'check_out' | 'special_request' | 'number' | 'price' | 'type' | 'status' | 'amenities' | 'room_status' | 'foto' | 'description' | 'phone' | 'email' | 'offer' | 'cancellation' | 'discount' | 'subject' | 'messages' | 'date' | 'read' | 'archived' | 'time_passed' | 'start_date' | 'job' | 'contact' | 'password',
    values: iEmployee | iBooking | iRoom,
}

interface FormControlProps {
    label: string,
    inputType: string,
    name: 'id' | 'full_name' | 'order_date' | 'check_in' | 'check_out' | 'special_request' | 'number' | 'price' | 'type' | 'status' | 'amenities' | 'room_status' | 'foto' | 'description' | 'phone' | 'email' | 'offer' | 'cancellation' | 'discount' | 'time_passed' | 'start_date' | 'job' | 'contact' | 'password',
    data?: Array<string>,
    values: iEmployee | iRoom | iBooking
}



const renderSwitch = ({inputType, data, name, values}: RenderProps) => {
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
        case 'date': {
            const date = new Date(values ? parseInt(values[name]) : '');
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return <input defaultValue={values ? `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}` : ''} name={name} type={inputType} />
        }
        case 'number':
            return <input defaultValue={values ? values[name] : 0} min={0} step='any' name={name} type={inputType} />
        default:
            return <input defaultValue={values ? values[name] : ''} name={name} type={inputType} />
    }
}

const FormControlComponent = ({ label, inputType, name, data = [], values }: FormControlProps) => {

    return (
        <div>

            {name === 'foto' && values &&
                <div>
                    <img src={values[name]} ></img>
                </div>
            }
            <label>{label}</label>
            {
                renderSwitch({inputType, data, name, values})
            }
        </div>
    );
}

export default FormControlComponent;