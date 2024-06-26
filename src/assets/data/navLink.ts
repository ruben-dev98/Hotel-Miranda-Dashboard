import { MdOutlineDashboard } from "react-icons/md";
import { PiKey } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import { IconType } from "react-icons";

interface INavLink {
    icon: IconType,
    text: string,
    path: string
}

export const links: INavLink[] = [
    {
        icon: MdOutlineDashboard,
        text: 'Dashboard',
        path: '/'
    },
    {
        icon: FaCalendarAlt,
        text: 'Bookings',
        path: '/bookings'
    },
    {
        icon: PiKey,
        text: 'Rooms',
        path: '/rooms'
    },
    {
        icon: FaUser,
        text: 'Users',
        path: '/users'
    },
    {
        icon: MdOutlineContactMail,
        text: 'Contact',
        path: '/contact'
    },
];