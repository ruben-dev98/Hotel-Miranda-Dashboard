import { FakesUri, iBooking, iEmployee, iMessage, iRoom } from "../entitys/Data";
import { SERVER } from "./varHelpers";

type data = iEmployee | iBooking | iMessage | iRoom;

const getAllData = async (path: string) => {
    try {
        //const data = await fetch(`${SERVER}${path}`);
        //const json = data.json();
        //return json;
    } catch(error) {
        console.error(error);
    }
};
const getOneData = (path: string, id: string) => {

};
const addData = (path: string, data: data) => data;
const editData = (path: string, id: string, data: data) => ({ id: id, data: data });
const deleteData = (path: string, id: string) => id;

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

export const FakeApi = (path: string, uri: FakesUri, id = '', data: data = {} as data) => {
    return new Promise<any>((resolve, reject) => {
        switch (path) {
            case uri.getAll:
                resolve(getAllData(path));
                break;
            case uri.getOne:
                resolve(getOneData(path, id));
                break;
            case uri.add:
                resolve(addData(path, data));
                break;
            case uri.edit:
                resolve(editData(path, id, data));
                break;
            case uri.delete:
                resolve(deleteData(path, id));
                break;
            case uri.getRoomsNumber:
                resolve(dataAvailableRoomsNumber(([])));
                break;
            default:
                reject('Array not found');
                break;
        }
    });
}