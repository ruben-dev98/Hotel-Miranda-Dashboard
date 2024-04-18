export interface ITabsObject {
    label: string,
    value: string
}

interface ITabs {
    bookings: ITabsObject[],
    rooms: ITabsObject[],
    message: ITabsObject[],
    users: ITabsObject[]
}



const tabs: ITabs = {
    bookings: [
        {
            label: "All Bookings",
            value: 'All Bookings'
        },
        {
            label: "Checking In",
            value: 'Check In'
        },
        {
            label: "Checking Out",
            value: 'Check Out'
        },
        {
            label: "In Progress",
            value: 'In Progress'
        }
    ],
    rooms: [
        {
            label: "All Rooms",
            value: 'All Rooms'
        },
    ],
    message: [
        {
            label: "All Contacts",
            value: 'All Contacts'
        },
        {
            label: "Archived",
            value: 'archived'
        },
    ],
    users: [
        {
            label: "All Employees",
            value: 'All Employees'
        },
        {
            label: "Active Employee",
            value: 'active'
        },
        {
            label: "Inactive Employee",
            value: 'inactive'
        },
    ]
}

export const { bookings, rooms, message, users } = tabs; 