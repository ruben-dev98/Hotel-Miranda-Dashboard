import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getBooking } from "../../features/bookings/bookingsAsyncThunk";
import { getOneBooking } from "../../features/bookings/bookingsSlice";
import Loading from "../../components/Loading";
import DetailsComponent from "../../components/Details/DetailsComponent";
import { AmenitiesStyled } from "../../styled/ListStyled";

const object__fields = [
    {
        'field': 'id',
        'type': 'text'
    },
    {
        'field': 'check_in',
        'type': 'text'
    },
    {
        'field': 'check_out',
        'type': 'text'
    },
    {
        'field': 'full_name',
        'type': 'text'
    },
    {
        'field': 'number',
        'type': 'text'
    },
    {
        'field': 'special_request',
        'type': 'text'
    },
    {
        'field': 'price',
        'type': 'text'
    },
    {
        'field': 'foto',
        'type': 'swiper'
    },
    {
        'field': 'description',
        'type': 'text'
    },
    {
        'field': 'type',
        'type': 'text'
    },
    {
        display: field => <AmenitiesStyled>{field.amenities.map((amen, index) => <li key={index}>{amen}</li>)}</AmenitiesStyled>,
        'type': 'text'
    },
    {
        'field': 'status',
        'type': 'text'
    }
];


const BookingPage = () => {
    const dispatch = useDispatch();
    const [showSpinner, setShowSpinner] = useState(true);
    const { id } = useParams();
    const booking = useSelector(getOneBooking);

    const result = useCallback(async () => {
        await dispatch(getBooking(parseInt(id))).unwrap();
        setShowSpinner(false);
    }, [id, dispatch]);

    useEffect(() => {
        result();
    }, [result]);

    return (

        <section className="content">
            {showSpinner ? <Loading></Loading> : <>
                <DetailsComponent data={booking} object__fields={object__fields}></DetailsComponent>
            </>
            }
        </section>
    );

}

export default BookingPage;