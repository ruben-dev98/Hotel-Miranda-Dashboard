
import BookingListComponent from '../components/BookingListComponent';
import CalendarComponent from '../components/Calendar/CalendarComponent';
import KPIsComponent from '../components/KPIsComponent';
import MessageListComponent from '../components/MessageListComponent';
import StatsComponent from '../components/StatsComponent';
import { FaCalendarCheck } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { ImEnter } from "react-icons/im";
import { ImExit } from "react-icons/im";

const DashboardPage = () => {

    return (
        <section className='content'>
            <div className='kpis'>
                <KPIsComponent icon={<IoBedOutline />} number={8000} text={'New Booking'}></KPIsComponent>
                <KPIsComponent icon={<FaCalendarCheck />} number={900} text={'Scheduled Room'}></KPIsComponent>
                <KPIsComponent icon={<ImEnter />} number={400} text={'Check In'}></KPIsComponent>
                <KPIsComponent icon={<ImExit />} number={200} text={'Check Out'}></KPIsComponent>
            </div>
            <div className='no__use'>
                <CalendarComponent></CalendarComponent>
                <BookingListComponent></BookingListComponent>
            </div>
            <StatsComponent></StatsComponent>
            <MessageListComponent></MessageListComponent>
        </section>
    )
}

export default DashboardPage;