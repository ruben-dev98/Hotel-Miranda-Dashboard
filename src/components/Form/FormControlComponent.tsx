
import { ReactNode } from 'react';
import { iBooking, iEmployee, iRoom } from '../../entitys/Data';

interface RenderProps {
    inputType: string,
    data: Array<string>,
    name: string,
    values: iRoom | iBooking | iEmployee,
}

interface FormControlProps {
    label: string,
    inputType: string,
    name: string,
    data?: Array<string>,
    values: iRoom | iBooking | iEmployee
}

const renderSwitch = ({ inputType, data, name, values }: RenderProps) => {
    const property = name as keyof iRoom & keyof iBooking & keyof iEmployee;
    switch (inputType) {
        case 'textarea':
            return <textarea defaultValue={values ? values[property] as string : ''} rows={5} name={name}></textarea>
        case 'select':
            return (<select defaultValue={values ? values[property] as string : ''} name={name}>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        case 'select multiple':
            return (<select defaultValue={values ? values[property] as string : []} name={name} multiple>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        case 'date': {
            const date = new Date(values ? parseInt(values[property] as string) : '');
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return <input defaultValue={values ? `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}` : ''} name={name} type={inputType} />
        }
        case 'number':
            return <input defaultValue={values ? values[property] as string : 0} min={0} step='any' name={name} type={inputType} />
        default:
            return <input defaultValue={values ? values[property] as string : ''} name={name} type={inputType} />
    }
}

const FormControlComponent = ({ label, inputType, name, data = [], values }: FormControlProps) => {
    let img: ReactNode;
    if(name === 'photo' && values) {
        if(Array.isArray((values as iRoom)[name])) {
            img = (values as iRoom)[name].map((photo) => {
                return <img src={photo} ></img>
            })
        }
        img = <img src={((values as iEmployee)[name])} ></img>
    }
    return (
        <div>
            {img && img}
            <label>{label}</label>
            {
                renderSwitch({ inputType, data, name, values })
            }
        </div>
    );
}

export default FormControlComponent;