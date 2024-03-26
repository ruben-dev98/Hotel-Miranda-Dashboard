import { iBooking, iEmployee, iMessage, iRoom } from "../entitys/Data";

export const lastId = (data: iRoom[] | iBooking[] | iEmployee[]) => {
    const newId = data[data.length - 1].id + 1;
    return newId;
};