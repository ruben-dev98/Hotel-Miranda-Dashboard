import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBooking } from "../../features/bookings/bookingsAsyncThunk";
import Loading from "../../components/Loading";
import DetailsComponent from "../../components/Details/DetailsComponent";
import { AmenitiesStyled } from "../../styled/ListStyled";
import { SpanStyledDetailsLabel, SpanStyledDetailsValue, SpanStyledDetailsTitle, SpanSwiperTitle, SpanSwiper, SpanStyledInProgressLegend, SpanStyledCheckOutLegend, SpanStyledCheckInLegend } from "../../styled/SpanStyled";
import { DivDetailsComponents, DivDetails, DivDetailsPart, DivDetailsSwiper, DivDetailsSwiperLegend, DivDetailsPartFirst, DivDetailsContent } from "../../styled/DivStyled";
import { Navigation } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { SwiperStyled } from "../../styled/SwiperStyled";
import { ObjectFields, iBooking } from "../../entities/Data";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { getOneBooking } from '../../features/bookings/bookingSlice';

const object__fields: ObjectFields[] = [
    {
        display: field => {
            const booking = field as iBooking;
            return (
                <DivDetails>
                    <DivDetailsPartFirst>
                        <SpanStyledDetailsTitle>
                            {booking.full_name}
                        </SpanStyledDetailsTitle><br></br>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Check In</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{new Date(parseInt(booking.check_in)).toDateString().slice(3)}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Check Out</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{new Date(parseInt(booking.check_out)).toDateString().slice(3)}</SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <hr></hr>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Room Info</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>{booking.room.type} - {booking.room.number}</SpanStyledDetailsValue>
                            </div>
                            <div>
                                <SpanStyledDetailsLabel>Price</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsValue>${booking.room.price}<SpanStyledDetailsLabel> /Night</SpanStyledDetailsLabel></SpanStyledDetailsValue>
                            </div>
                        </DivDetailsComponents>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Special Request</SpanStyledDetailsLabel><br></br>
                                <SpanStyledDetailsLabel>{booking.special_request}</SpanStyledDetailsLabel>
                            </div>
                        </DivDetailsComponents>
                        <DivDetailsComponents>
                            <div>
                                <SpanStyledDetailsLabel>Amenities</SpanStyledDetailsLabel><br></br>
                                <AmenitiesStyled>{booking.room.amenities.map((amen, index) => <li key={index}>{amen}</li>)}</AmenitiesStyled>
                            </div>
                        </DivDetailsComponents>
                    </DivDetailsPartFirst>
                    <DivDetailsPart>
                        <DivDetailsSwiperLegend>
                            {
                                booking.status === 'Check In' ?
                                    <SpanStyledCheckInLegend>{booking.status}</SpanStyledCheckInLegend> :
                                    booking.status === 'Check Out' ?
                                        <SpanStyledCheckOutLegend>{booking.status}</SpanStyledCheckOutLegend> :
                                        <SpanStyledInProgressLegend>{booking.status}</SpanStyledInProgressLegend>
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
                            {booking.room.photo.map((photo, index) => {
                                return <SwiperSlide key={index} style={{ userSelect: 'none' }}>
                                    <img src={photo} />
                                </SwiperSlide>
                            })}
                        </SwiperStyled>
                        <DivDetailsSwiper>
                            <DivDetailsContent>
                                <SpanSwiperTitle>{booking.room.type}</SpanSwiperTitle><br></br>
                                <SpanSwiper>{booking.room.description}</SpanSwiper>
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
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const booking = useAppSelector(getOneBooking);

    const initialFetch = async () => {
        await dispatch(getBooking(id || '')).unwrap();
        setIsLoading(false);
    };

    useEffect(() => {
        initialFetch();
    }, []);

    if (isLoading) {
        return (
            <section className='content'>
                <Loading></Loading>
            </section>);
    }

    return (
        <section className="content">
            <DetailsComponent data={booking} object__fields={object__fields}></DetailsComponent>
        </section>
    );

}

export default BookingPage;