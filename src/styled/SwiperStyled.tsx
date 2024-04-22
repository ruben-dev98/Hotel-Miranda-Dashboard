import { styled } from "styled-components";
import { Swiper } from 'swiper/react';

export const SwiperStyled = styled(Swiper)`
height: 100%;
width: 100%;

.swiper-slide {
    height: 100%;
    width: 100%;

    img {
        border-radius: 0px 10px 10px 0px;
        height: 100%;
        width: 100%;
    }
}

    .swiper-button-next, .swiper-button-prev {
        border: 1px ${props => props.theme && props.theme.main} solid;
        background-color: ${props => props.theme && props.theme.swiper};
        width: 30px;
        height: 30px;
        border-radius: 10px;
        bottom: 150px;
        top: auto;

        &::after {
            font-size: 1.2rem;
            color: ${props => props.theme && props.theme.main};
        }
    }
    
    .swiper-button-prev {
        left: 10%;
    }

    .swiper-button-next {
        right: 10%;
    }

    .swiper-button-disabled {
        background-color: ${props => props.theme && props.theme.swiper_disabled};
    }
`