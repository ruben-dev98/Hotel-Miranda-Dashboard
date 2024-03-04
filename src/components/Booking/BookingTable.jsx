import Table from "../Table";

const BookingTable = () => {
    const bookings = [];

    return (
        <Table rows={bookings} colums={7}></Table>
    );
};

export default BookingTable;