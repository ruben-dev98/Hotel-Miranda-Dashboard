import MySweetAlertApi from "../app/MySweetAlertApi";
import { FakesUri, iBooking, iEmployee, iMessage, iRoom } from "../entities/Data";
import { METHOD_DELETE, METHOD_POST, METHOD_PUT, SERVER, connectionError, localStorageGetAction, localStorageTokenKey } from "./constants";
import { personalMessage } from "./personalMessage";
import { accessToLocalStorage } from "./accessToLocalStorage";

type dataType = iEmployee | iBooking | iMessage | iRoom;

const getAllData = async (path: string) => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        );

        const json = await apiData.json();
        if (apiData.ok) {
            return await json.data;
        }
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' })
    }
};

const getOneData = async (path: string, id: string) => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        console.log(`${SERVER}${path}/${id}`);
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await apiData.json();
        if (apiData.ok) {
            return await json.data;
        }
        MySweetAlertApi({ title: `${personalMessage(path)} #${id} could not be found`, icon: 'success' });
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' })
    }
};

const addData = async (path: string, data: dataType) => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}`, {
            method: METHOD_POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const json = await apiData.json();
        if (apiData.ok) {
            MySweetAlertApi({ title: `${personalMessage(path)} #${json.data._id} was successfully added`, icon: 'success' })
            return await json.data;
        }
        MySweetAlertApi({ title: json.data, icon: 'error' });
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' });
    }
};

const editData = async (path: string, id: string, data: dataType) => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
            method: METHOD_PUT,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const json = await apiData.json();
        if (apiData.ok) {
            MySweetAlertApi({ title: `${personalMessage(path)} #${json.data._id} was successfully edited`, icon: 'success' })
            return await json.data;
        }
        MySweetAlertApi({ title: `${personalMessage(path)} #${id} could not be found`, icon: 'success' });
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' })
    }
}

const deleteData = async (path: string, id: string) => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
            method: METHOD_DELETE,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await apiData.json();
        if (apiData.ok) {
            return await json.data;
        }
        MySweetAlertApi({ title: `${personalMessage(path)} #${id} could not be found`, icon: 'success' })
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' });
    }
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

export const callAPI = (path: string, operation: number, uri: FakesUri, id = '', data: dataType = {} as dataType) => {
    return new Promise<any>((resolve, reject) => {
        switch (operation) {
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
                reject('Error');
                break;
        }
    });
}