import { bookingsTabs } from "../assets/data/tabs";
import Tabs from "../components/Tabs";

const BookingPage = () => {


    return (
        <Tabs data={bookingsTabs}></Tabs>
    );
}

export default BookingPage;