import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getBooking } from "../../features/bookings/bookingsAsyncThunk";
import { getOneBooking } from "../../features/bookings/bookingsSlice";
import Loading from "../../components/Loading";
import DetailsComponent from "../../components/Details/DetailsComponent";
import { AmenitiesStyled } from "../../styled/ListStyled";
import { SpanStyledDetailsLabel, SpanStyledDetailsValue, SpanStyledDetailsTitle, SpanSwiperTitle, SpanSwiper, SpanStyledInProgressLegend, SpanStyledCheckOutLegend, SpanStyledCheckInLegend } from "../../styled/SpanStyled";
import { DivDetailsComponents, DivDetails, DivDetailsPart, DivDetailsSwiper, DivDetailsSwiperLegend, DivDetailsPartFirst, DivDetailsContent } from "../../styled/DivsStyled";
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
            return (
                <DivDetails>
                    <DivDetailsPartFirst>
                        <SpanStyledDetailsTitle>
                            {field.full_name}
                        </SpanStyledDetailsTitle><br></br>
                        <SpanStyledDetailsLabel>
                            #{field.id}
                        </SpanStyledDetailsLabel>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Check In</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{new Date(parseInt(field.check_in)).toDateString().slice(3)}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Check Out</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{new Date(parseInt(field.check_out)).toDateString().slice(3)}</SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <hr></hr>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Room Info</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{field.type} - {field.number}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Price</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>${field.offer === true ? field.price - (field.price * field.discount / 100) : field.price}<SpanStyledDetailsLabel> /Night</SpanStyledDetailsLabel></SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Special Request</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsLabel>{field.special_request}</SpanStyledDetailsLabel>
                            </div>
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
                                field.status === 'Check In' ?
                                    <SpanStyledCheckInLegend>{field.status}</SpanStyledCheckInLegend> :
                                    field.status === 'Check Out' ?
                                        <SpanStyledCheckOutLegend>{field.status}</SpanStyledCheckOutLegend> :
                                        <SpanStyledInProgressLegend>{field.status}</SpanStyledInProgressLegend>
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
                            <DivDetailsContent>
                                <SpanSwiperTitle>{field.type}</SpanSwiperTitle><br></br>
                                <SpanSwiper>{field.description}</SpanSwiper>
                            </DivDetailsContent>
                        </DivDetailsSwiper>
                    </DivDetailsPart>
                </DivDetails>
            )
        },
        'type': 'text'
    },
];


const BookingPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const booking = useSelector(getOneBooking);

    const initialFetch = async () => {
        await dispatch(getBooking(parseInt(id))).unwrap();
        setIsLoading(false);
    };

    useEffect(() => {
        initialFetch();
    }, []);

    if (isLoading) {
        return (<section className='content'>
            <Loading></Loading>
        </section>)
    }

    return (
        <section className="content">
            <DetailsComponent data={booking} object__fields={object__fields}></DetailsComponent>
        </section>
    );

}

export default BookingPage;