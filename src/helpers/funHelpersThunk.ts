import { FakesUri, iBooking, iEmployee, iMessage, iRoom } from "../entitys/Data";

interface ArrayIData {
    data: Array<iBooking | iRoom | iMessage | iEmployee> | null
}

interface ArrayIRooms extends ArrayIData {
    rooms: Array<iRoom> | null;
}

interface iData {
    data: iBooking | iRoom | iMessage | iEmployee | null
}

const getAllData = (aData: ArrayIData) => aData.data;
const getOneData = (aData: ArrayIData, id: number) => aData.data?.find((items) => items.id === id);
const addData = (data: iData) => data;
const editData = (id: number, data: iData) => ({ id: id, data: data });
const deleteData = (id: number) => id;

export const dataAvailableRoomsNumber = (aData: ArrayIRooms) => aData.rooms?.filter((room: iRoom) => room.status === 'Available').map(room => room.number).sort((a, b) => {
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

export const FakeApi = (path: string, uri: FakesUri, id = 0, data: iData, aData: ArrayIRooms) => {
    return new Promise((resolve, reject) => {
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
                resolve(dataAvailableRoomsNumber(aData));
                break;
            default:
                reject('Array not found');
                break;
        }
    });
}