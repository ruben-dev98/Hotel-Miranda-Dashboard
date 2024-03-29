import MessageComponent from "./MessageComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from "styled-components";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages, messagesStatus } from "../features/messages/messagesSlice";
import { useEffect } from "react";
import { getMessages } from "../features/messages/messagesAsyncThunk";


const SwiperStyled = styled(Swiper)`
    margin: 32px 0px 0px 0px;
    height: 250px;

    & .swiper-slide {
        height: 200px;
        padding: 1rem;
    }
`

const MessageListComponent = () => {
    const dispatch = useDispatch();
    const data = useSelector(getAllMessages);
    const status = useSelector(messagesStatus);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(getMessages());
        }
    }, [status, dispatch])

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
            
            {data.map((message, index) => {
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