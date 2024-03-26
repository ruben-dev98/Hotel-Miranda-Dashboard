import { FakesUri, iBooking, iEmployee, iMessage, iRoom } from "../entitys/Data";

const getAllData = (data: iEmployee[] | iBooking[] | iRoom[] | iMessage[] ) => data;
const getOneData = (data: iEmployee[] | iBooking[] | iRoom[] | iMessage[], id: number) => data.find((item) => item.id === id);
const addData = (data: iEmployee | iBooking | iMessage | iRoom) => data;
const editData = (id: number, data: iMessage | iRoom | iBooking | iEmployee) => ({ id: id, data: data });
const deleteData = (id: number) => id;

export const dataAvailableRoomsNumber = (data: iRoom[]) => data.filter((room) => room.status === 'Available').map(room => room.number).sort((a, b) => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
})

export const delay = (time = 200) => {
    return new Promise((r) => {
        setTimeout(r, time)
    });
}

export const FakeApi = (path: string, uri: FakesUri, id = 0, data: iRoom | iEmployee | iMessage | iBooking, aData: iRoom[] | iEmployee[] | iMessage[] | iBooking[]) => {
    return new Promise<any>((resolve, reject) => {
        switch (path) {
            case uri.getAll:
                resolve(getAllData(aData));
                break;
            case uri.getOne:
                resolve(getOneData(aData, id));
                break;
            case uri.add:
                resolve(addData(data));
                break;
            case uri.edit:
                resolve(editData(id, data));
                break;
            case uri.delete:
                resolve(deleteData(id));
                break;
            case uri.getRoomsNumber:
                resolve(dataAvailableRoomsNumber((aData as iRoom[])));
                break;
            default:
                reject('Array not found');
                break;
        }
    });
}