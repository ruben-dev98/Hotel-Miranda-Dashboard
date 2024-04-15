import { LOGIN_PATH, PATH_BOOKING, PATH_EMPLOYEE, PATH_MESSAGE, PATH_ROOM } from "./constants";

export const personalMessage = (path: string): string => {
    let message: string = '';
    switch(path) {
        case PATH_BOOKING: 
            message = 'Booking';
            break;
        case PATH_ROOM:  
            message = 'Room';
            break;
        case LOGIN_PATH: case PATH_EMPLOYEE:
            message = 'Employee';
            break;
        case PATH_MESSAGE:
            message = 'Message';
            break;
        default:
            message = 'Data';
            break;
    }
    return message;
}