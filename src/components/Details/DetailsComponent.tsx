
import { ObjectFields, iBooking, iEmployee, iRoom } from '../../entities/Data';
import { ButtonStyled } from '../../styled/ButtonStyled';
import { FaArrowLeftStyled } from '../../styled/IconStyled';
import { useNavigate } from 'react-router-dom';

interface DetailsProps {
    data: iRoom | iBooking | iEmployee,
    object__fields: ObjectFields[]
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
                        {field.display(data)}
                    </div>
                )
            }
        </section>
    );

}

export default DetailsComponent;