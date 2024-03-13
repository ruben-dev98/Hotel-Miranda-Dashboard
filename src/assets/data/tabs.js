const tabs = {
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
            label: "All Contact",
            value: 'All Contact'
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
            value: true
        },
        {
            label: "Inactive Employee",
            value: false
        },
    ]
}

export const { bookings, rooms, message, users } = tabs; 