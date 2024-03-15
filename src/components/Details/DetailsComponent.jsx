
import PropTypes from 'prop-types';
import { ButtonStyled } from '../../styled/ButtonsStyled';
import { FaArrowLeftStyled } from '../../styled/IconStyled';
import { useNavigate } from 'react-router-dom';

const transformData = (field, data) => {
    return data[field.field] ? data[field.field] : field.display(data)
}



const DetailsComponent = ({ data, object__fields }) => {
    const navigate = useNavigate();


    return (
        <section className="details">
            <ButtonStyled onClick={() => navigate(-1)}>
                <FaArrowLeftStyled />
            </ButtonStyled>
            {
                object__fields.map((field, index) =>
                    <div key={index}>
                        {transformData(field, data)}
                    </div>
                )
            }
        </section>
    );

}

DetailsComponent.propTypes = {
    data: PropTypes.object,
    object__fields: PropTypes.array
}

export default DetailsComponent;