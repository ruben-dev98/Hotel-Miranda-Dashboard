
import PropTypes from 'prop-types';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styled from 'styled-components';
import { ButtonStyled } from '../../styled/ButtonsStyled';
import { FaArrowLeftStyled } from '../../styled/IconStyled';
import { useNavigate } from 'react-router-dom';

const SwiperStyled = styled(Swiper)`
    grid-area: photo;
`;

const DetailsStyled = styled.section`
    grid-template-columns: none;
`;

const transformData = (field, data) => {
    switch (field.type) {
        case 'text':
            return <p>{ data[field.field] ? data[field.field] : field.display(data)}</p>
        case 'date':
            return <p>{ new Date(parseInt(data[field.field])).toDateString() }</p>
        case 'swiper':
            return (
                <Swiper
                    // install Swiper modules
                    modules={[Navigation]}
                    slidesPerView={1}
                    navigation={true}
                    onSwiper={(swiper) => { }}
                    onSlideChange={() => { }}
                >
                    <SwiperSlide style={{ userSelect: 'none' }}>
                        <img src={data[field.field]} />
                    </SwiperSlide>
                    <SwiperSlide style={{ userSelect: 'none' }}>
                        <img src={data[field.field]} />
                    </SwiperSlide>
                    <SwiperSlide style={{ userSelect: 'none' }}>
                        <img src={data[field.field]} />
                    </SwiperSlide>
                </Swiper>
            );
        case 'img':
                return <img src={data[field.field]}/>
    }
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