import styled from "styled-components";
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
        border: 1px #FFF solid;
        background-color: #FFFFFF47;
        width: 30px;
        height: 30px;
        border-radius: 10px;
        bottom: 150px;
        top: auto;

        &::after {
            font-size: 1.2rem;
            color: #FFF;
        }
    }
    
    .swiper-button-prev {
        left: 10%;
    }

    .swiper-button-next {
        right: 10%;
    }

    .swiper-button-disabled {
        background-color: #FFFFFF1A;
    }
`