
import BookingList from '../components/BookingList';
import Calendar from '../components/Calendar';
import KPIs from '../components/KPIs';
import MenuLateral from '../components/Menu/MenuLateral';
import MenuSuperior from '../components/Menu/MenuSuperior';
import MessageList from '../components/MessageList';
import Stats from '../components/Stats';


const DashboardPage = () => {

    return (
        <>
            <div>
                <KPIs></KPIs>
                <KPIs></KPIs>
                <KPIs></KPIs>
                <KPIs></KPIs>
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