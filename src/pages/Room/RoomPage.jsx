import { useParams } from "react-router-dom";
import { getOneRoom } from '../../features/rooms/roomsSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoom } from '../../features/rooms/roomsAsyncThunk';
import Loading from "../../components/Loading";
import DetailsComponent from "../../components/Details/DetailsComponent";
import { AmenitiesStyled } from "../../styled/ListStyled";
import { SpanStyledDetailsLabel, SpanStyledDetailsValue, SpanSwiperTitle, SpanSwiper, SpanStyledCheckOutLegend, SpanStyledCheckInLegend} from "../../styled/SpanStyled";
import { DivDetailsComponents, DivDetails, DivDetailsPart, DivDetailsSwiper, DivDetailsSwiperLegend, DivDetailsPartFirst} from "../../styled/DivsStyled";
import { Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { SwiperStyled } from "../../styled/SwiperStyled";



const object__fields = [
    {
        display: field => {
            return(<DivDetails>
                    <DivDetailsPartFirst>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Room Info</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{field.type} - {field.number}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Price</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>${field.offer === true ? (field.price - (field.price * field.discount / 100)).toFixed(2) : field.price}<SpanStyledDetailsLabel> /Night</SpanStyledDetailsLabel></SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <DivDetailsComponents>
                        </DivDetailsComponents>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Amenities</SpanStyledDetailsLabel><br></br>
                                <AmenitiesStyled>{field.amenities.map((amen, index) => <li key={index}>{amen}</li>)}</AmenitiesStyled>
                            </div>
                        </DivDetailsComponents>
                    </DivDetailsPartFirst>
                    <DivDetailsPart>
                        <DivDetailsSwiperLegend>
                        {
                            field.status === 'Available' ?
                                <SpanStyledCheckInLegend>{field.status}</SpanStyledCheckInLegend> :
                                <SpanStyledCheckOutLegend>{field.status}</SpanStyledCheckOutLegend>
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
                            <SwiperSlide style={{ userSelect: 'none' }}>
                                <img src={field.foto} />
                            </SwiperSlide>
                            <SwiperSlide style={{ userSelect: 'none' }}>
                                <img src={field.foto} />
                            </SwiperSlide>
                            <SwiperSlide style={{ userSelect: 'none' }}>
                                <img src={field.foto} />
                            </SwiperSlide>
                        </SwiperStyled>
                        <DivDetailsSwiper>
                            <div style={{width: '80%', margin: '0px auto'}}>
                                <SpanSwiperTitle>{field.type}</SpanSwiperTitle><br></br>
                                <SpanSwiper>{field.description}</SpanSwiper>
                            </div>
                        </DivDetailsSwiper>
                    </DivDetailsPart>
                </DivDetails>);
        },
        'type': 'text'
    }
];


const RoomPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const room = useSelector(getOneRoom);
    const { id } = useParams();

    const initialFetch = async () => {
        try {
            await dispatch(getRoom(parseInt(id))).unwrap();
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