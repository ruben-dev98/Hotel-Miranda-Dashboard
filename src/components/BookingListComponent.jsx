import Booking from "./BookingComponent";

const BookingList = () => {
    const bookings = [];

    return (
        <>
            {bookings.map((booking, index) => <Booking key={index}></Booking>)}
        </>
    );
}

export default BookingList;