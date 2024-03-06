import MessageComponent from "./MessageComponent";
import messages from '../assets/data/messages.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from "styled-components";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const SwiperStyled = styled(Swiper)`
    margin: 32px 0px 0px 0px;
    height: 250px;

    & .swiper-slide {
        height: 200px;
    }
`

const MessageListComponent = () => {

    return (
        <SwiperStyled
            // install Swiper modules
            //modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            //navigation
            //pagination={{ clickable: true }}
            //scrollbar={{ draggable: true }}
            onSwiper={(swiper) => {}}
            onSlideChange={() => {}}
        >
            
            {messages.map((message, index) => {
            return (
                <SwiperSlide style={{userSelect: 'none'}} key={index}>
                    <MessageComponent message={message}>
                    </MessageComponent>
                </SwiperSlide>
                )
            })}
        </SwiperStyled>
    )
}

export default MessageListComponent;