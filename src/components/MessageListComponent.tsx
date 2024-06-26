import MessageComponent from "./MessageComponent";
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from "styled-components";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getAllMessages, messagesStatus } from "../features/messages/messagesSlice";
import { useEffect } from "react";
import { getMessages } from "../features/messages/messagesAsyncThunk";
import { useAppDispatch, useAppSelector } from "../hook/useStore";


const SwiperStyled = styled(Swiper)`
    margin: 0px;
    height: 250px;

    & .swiper-slide {
        height: 200px;
        padding: 1rem;
    }
`

const MessageListComponent = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(getAllMessages);

    const initialFetch = async () => {
        try {
            await dispatch(getMessages()).unwrap();
        } catch (error) {
            console.error('error');
        }
    }

    useEffect(() => {
        initialFetch();
    }, [])

    return (
        <SwiperStyled
            slidesPerView={2}
        >

            {
                data && data.length > 0 ? data.slice(0, 3).map((message, index) => {
                    return (
                        <SwiperSlide style={{ userSelect: 'none' }} key={index}>
                            <MessageComponent message={message} />
                        </SwiperSlide>
                    )
                })
                    : ''
            }
        </SwiperStyled>
    )
}

export default MessageListComponent;