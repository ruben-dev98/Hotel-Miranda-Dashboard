
import { ReactNode } from 'react';
import { iBooking, iEmployee, iRoom } from '../../entities/Data';
import styled from 'styled-components';

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

const ImgStyled = styled.img`
    width: 125px;
    height: 125px;
    margin-right: 15px;
`;

const renderSwitch = ({ inputType, data, name, values }: RenderProps) => {
    const property = name as keyof iRoom & keyof iBooking & keyof iEmployee;
    switch (inputType) {
        case 'textarea':
            return <textarea required defaultValue={values ? values[property] as string : ''} rows={5} name={name}></textarea>
        case 'select':
            return (<select required defaultValue={values ? values[property] as string : ''} name={name}>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        case 'select multiple':
            return (<select required defaultValue={values ? values[property] as string : []} name={name} multiple>
                {data.map((element, index) => {
                    return <option key={index}>{element}</option>
                })}
            </select>)
        case 'date': {
            const date = new Date(values ? parseInt(values[property] as string) : '');
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return <input required defaultValue={values ? `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}` : ''} name={name} type={inputType} />
        }
        case 'number':
            return <input required defaultValue={values ? values[property] as string : 0} min={0} step='any' name={name} type={inputType} />
        case 'password':
            return <input name={name} type={inputType} />
        default:
            return <input required defaultValue={values ? values[property] as string : ''} name={name} type={inputType} />
    }
}

const FormControlComponent = ({ label, inputType, name, data = [], values }: FormControlProps) => {
    let img: ReactNode;
    if(name === 'photo' && values) {
        if(Array.isArray((values as iRoom)[name])) {
            img = (values as iRoom)[name].map((photo, index) => {
                return <ImgStyled key={index} src={photo} />;
            })
        } else {
            img = <ImgStyled src={((values as iEmployee)[name])} />
        }
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