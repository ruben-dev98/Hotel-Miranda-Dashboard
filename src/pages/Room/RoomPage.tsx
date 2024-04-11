import { useParams } from "react-router-dom";
import { getOneRoom } from '../../features/rooms/roomsSlice';
import { useEffect, useState } from 'react';
import { getRoom } from '../../features/rooms/roomsAsyncThunk';
import Loading from "../../components/Loading";
import DetailsComponent from "../../components/Details/DetailsComponent";
import { AmenitiesStyled } from "../../styled/ListStyled";
import { SpanStyledDetailsLabel, SpanStyledDetailsValue, SpanSwiperTitle, SpanSwiper, SpanStyledCheckOutLegend, SpanStyledCheckInLegend } from "../../styled/SpanStyled";
import { DivDetailsComponents, DivDetails, DivDetailsPart, DivDetailsSwiper, DivDetailsSwiperLegend, DivDetailsPartFirst } from "../../styled/DivStyled";
import { Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { SwiperStyled } from "../../styled/SwiperStyled";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { ObjectFields, iRoom } from "../../entitys/Data";


const object__fields: ObjectFields[] = [
    {
        display: field => {
            const room = field as iRoom;
            return (<DivDetails>
                <DivDetailsPartFirst>
                    <DivDetailsComponents>
                        <div>
                            <SpanStyledDetailsLabel>Room Info</SpanStyledDetailsLabel><br></br>
                            <SpanStyledDetailsValue>{room.type} - {room.number}</SpanStyledDetailsValue>
                        </div>
                        <div>
                            <SpanStyledDetailsLabel>Price</SpanStyledDetailsLabel><br></br>
                            <SpanStyledDetailsValue>${room.offer === true ? (room.price - (room.price * room.discount / 100)).toFixed(2) : room.price}<SpanStyledDetailsLabel> /Night</SpanStyledDetailsLabel></SpanStyledDetailsValue>
                        </div>
                    </DivDetailsComponents>
                    <DivDetailsComponents>
                    </DivDetailsComponents>
                    <DivDetailsComponents>
                        <div>
                            <SpanStyledDetailsLabel>Amenities</SpanStyledDetailsLabel><br></br>
                            <AmenitiesStyled>{room.amenities.map((amen, index) => <li key={index}>{amen}</li>)}</AmenitiesStyled>
                        </div>
                    </DivDetailsComponents>
                </DivDetailsPartFirst>
                <DivDetailsPart>
                    <DivDetailsSwiperLegend>
                        {
                            room.status === 'Available' ?
                                <SpanStyledCheckInLegend>{room.status}</SpanStyledCheckInLegend> :
                                <SpanStyledCheckOutLegend>{room.status}</SpanStyledCheckOutLegend>
                        }
                    </DivDetailsSwiperLegend>
                    <SwiperStyled
                        // install Swiper modules
                        modules={[Navigation]}
                        slidesPerView={1}
                        navigation={true}
                        onSwiper={() => { }}
                        onSlideChange={() => { }}
                    >
                        {room.photo.map((photo) => {
                            return <SwiperSlide style={{ userSelect: 'none' }}>
                                <img src={photo} />
                            </SwiperSlide>
                        })}
                    </SwiperStyled>
                    <DivDetailsSwiper>
                        <div style={{ width: '80%', margin: '0px auto' }}>
                            <SpanSwiperTitle>{room.type}</SpanSwiperTitle><br></br>
                            <SpanSwiper>{room.description}</SpanSwiper>
                        </div>
                    </DivDetailsSwiper>
                </DivDetailsPart>
            </DivDetails>);
        },
        'type': 'text'
    }
];


const RoomPage = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const room = useAppSelector(getOneRoom);
    const { id } = useParams();

    const initialFetch = async () => {
        try {
            await dispatch(getRoom(id || '')).unwrap();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        initialFetch();
    }, [])

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className="content">
            <DetailsComponent data={room} object__fields={object__fields}></DetailsComponent>
        </section>
    )
}

export default RoomPage;