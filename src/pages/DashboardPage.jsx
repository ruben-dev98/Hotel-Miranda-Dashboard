import MenuSuperior from '../components/Menu/MenuSuperior';
import MenuLateral from '../components/menu/MenuLateral';
import KPIs from './../components/KPIs';
import BookingList from './../components/BookingList';
import Calendar from './../components/Calendar';
import Stats from '../components/Stats';
import MessageList from './../components/MessageList';

const DashboardPage = () => {

    return (
        <>
            <MenuLateral/>
            <MenuSuperior/>
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