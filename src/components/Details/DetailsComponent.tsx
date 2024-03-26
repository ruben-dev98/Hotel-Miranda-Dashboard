
import { ObjectFieldsBooking, ObjectFieldsEmployee, ObjectFieldsRoom, iBooking, iEmployee, iRoom } from '../../entitys/Data';
import { ButtonStyled } from '../../styled/ButtonStyled';
import { FaArrowLeftStyled } from '../../styled/IconStyled';
import { useNavigate } from 'react-router-dom';

interface TransformDataProps {
    field: ObjectFieldsBooking | ObjectFieldsEmployee | ObjectFieldsRoom,
    data: iRoom & iBooking & iEmployee
}

const transformData = ({ field, data }: TransformDataProps) => {
    return field.display(data);
}

interface DetailsProps {
    data: iRoom & iBooking & iEmployee,
    object__fields: ObjectFieldsBooking[] | ObjectFieldsEmployee[] | ObjectFieldsRoom[]
}


const DetailsComponent = ({ data, object__fields }: DetailsProps) => {
    const navigate = useNavigate();

    return (
        <section className="details">
            <ButtonStyled onClick={() => navigate(-1)}>
                <FaArrowLeftStyled />
            </ButtonStyled>
            {
                object__fields.map((field, index) =>
                    <div key={index}>
                        {transformData({ field, data })}
                    </div>
                )
            }
        </section>
    );

}

export default DetailsComponent;