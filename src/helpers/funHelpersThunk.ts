import { FakesUri, iBooking, iEmployee, iMessage, iRoom } from "../entities/Data";
import { METHOD_DELETE, METHOD_POST, METHOD_PUT, SERVER } from "./varHelpers";

type dataType = iEmployee | iBooking | iMessage | iRoom;

const getAllData = async (path: string) => {
    try {
        const apiData = await fetch(`${SERVER}${path}`);
        const json = await apiData.json();
        return await json.data;
    } catch(error) {
        console.error(error);
    }
};
const getOneData = async (path: string, id: string) => {
    try {
        const apiData = await fetch(`${SERVER}${path}/${id}`);
        const json = await apiData.json();
        return await json.data;
    } catch(error) {
        console.error(error);
    }
};
const addData = async (path: string, data: dataType) => {
    try {
        const apiData = await fetch(`${SERVER}${path}`, {
            method: METHOD_POST,
            body: JSON.stringify(data)
        });
        const json = await apiData.json();
        return await json.data;
    } catch(error) {
        console.error(error);
    }
};
const editData = async (path: string, id: string, data: dataType) => {
    try {
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
            method: METHOD_PUT,
            body: JSON.stringify(data)
        });
        const json = await apiData.json();
        return await json.data;
    } catch(error) {
        console.error(error);
    }
}
const deleteData = async (path: string, id: string) => {
    const apiData = await fetch(`${SERVER}${path}/${id}`, {
        method: METHOD_DELETE
    });
    const json = await apiData.json();
    return await json.data;
};

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

export const FakeApi = (path: string, uri: FakesUri, id = '', data: dataType = {} as dataType) => {
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