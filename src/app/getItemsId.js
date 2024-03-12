import dataBookings from '../assets/data/bookings.json';
import dataRooms from '../assets/data/rooms.json';
import dataEmployees from '../assets/data/users.json';



export const bookingsId = (dataBookings[dataBookings.length - 1].id + 1);
export const roomsId = (dataRooms[dataRooms.length - 1].id);
export const employeesId = (dataEmployees[dataEmployees.length - 1].id);
