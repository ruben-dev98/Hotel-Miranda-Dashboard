interface IOrder {
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
        label: 'Numero Habitacion',
        value: 'number asc'
    },
    {
        label: 'Disponible',
        value: 'status asc'
    },
    {

        label: 'Ocupada',
        value: 'status desc'
    },

    {
        label: 'Precio Mayor a Menor',
        value: 'price desc'
    },
    {
        label: 'Precio Menor a Mayor',
        value: 'price asc'
    }
];

export const usersOrder: IOrder[] = [
    {
        label: 'Fecha De Alta',
        value: 'start_date'
    },
    {
        label: 'Nombre',
        value: 'full_name'
    }]; 