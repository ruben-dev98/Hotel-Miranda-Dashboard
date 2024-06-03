
import KPIsComponent from '../components/KPIsComponent';
import MessageListComponent from '../components/MessageListComponent';
import { FaCalendarCheck } from "react-icons/fa6";
import { IoBedOutline } from "react-icons/io5";
import { ImEnter } from "react-icons/im";
import { ImExit } from "react-icons/im";
import { DivStyledKPIs, SectionContent } from '../styled/DivStyled';

const DashboardPage = () => {

    return (
        <SectionContent>
            <DivStyledKPIs>
                <KPIsComponent icon={<IoBedOutline />} number={8000} text={'New Booking'}></KPIsComponent>
                <KPIsComponent icon={<FaCalendarCheck />} number={900} text={'Scheduled Room'}></KPIsComponent>
                <KPIsComponent icon={<ImEnter />} number={400} text={'Check In'}></KPIsComponent>
                <KPIsComponent icon={<ImExit />} number={200} text={'Check Out'}></KPIsComponent>
            </DivStyledKPIs>
            <MessageListComponent></MessageListComponent>
        </SectionContent>
    )
}

export default DashboardPage;