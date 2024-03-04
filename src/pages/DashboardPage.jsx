
import BookingList from '../components/BookingList';
import Calendar from '../components/Calendar';
import KPIs from '../components/KPIs';
import MessageList from '../components/MessageList';
import Stats from '../components/Stats';
import { FaCalendarCheck } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { ImEnter } from "react-icons/im";
import { ImExit } from "react-icons/im";


const DashboardPage = () => {

    return (
        <>
            <div>
                <KPIs icon={<IoBedOutline />} number={8000} text={'New Booking'}></KPIs>
                <KPIs icon={<FaCalendarCheck />} number={900} text={'Scheduled Room'}></KPIs>
                <KPIs icon={<ImEnter />} number={400} text={'Check In'}></KPIs>
                <KPIs icon={<ImExit />} number={200} text={'Check Out'}></KPIs>
            </div>
            <div>
                <Calendar></Calendar>
                <BookingList></BookingList>
            </div>
            <Stats></Stats>
            <MessageList></MessageList>
        </>
    )
}

export default DashboardPage;