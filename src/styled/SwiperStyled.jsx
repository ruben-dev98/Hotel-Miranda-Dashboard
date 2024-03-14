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
        
    }
`