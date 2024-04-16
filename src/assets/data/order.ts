export interface IOrder {
    label: string,
    value: string
}

export const bookingsOrder: IOrder[] = [
    {
        label: 'Order Date',
        value: 'order_date'
    },
    {

        label: 'Guest',
        value: 'full_name'
    },

    {
        label: 'Check In',
        value: 'check_in'
    },
    {
        label: 'Check Out',
        value: 'check_out'
    }
];

export const roomsOrder: IOrder[] = [
    {
        label: 'Room Number',
        value: 'number asc'
    },
    {
        label: 'Available',
        value: 'status asc'
    },
    {

        label: 'Booked',
        value: 'status desc'
    },

    {
        label: 'Price Highest to Lowest',
        value: 'price desc'
    },
    {
        label: 'Price Lowest to Highest',
        value: 'price asc'
    }
];

export const usersOrder: IOrder[] = [
    {
        label: 'Start Date',
        value: 'start_date'
    },
    {
        label: 'Full Name',
        value: 'full_name'
    }]; 