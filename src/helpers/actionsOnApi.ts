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

const dataAvailableRoomsNumber = async (path: string) => {
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
            const roomNumber: number = await json.data.map((item: iRoom) => item.number).sort((a: number, b: number) => {
                if(a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                }
                return 0;
            });
            return await roomNumber;
        }
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' })
    }
}

export const delay = (time = 200) => {
    return new Promise((r) => {
        setTimeout(r, time)
    });
}

export const callAPI = (path: string, operation: number, uri: FakesUri, id = '', data: dataType = {} as dataType) => {
        switch (operation) {
            case uri.getAll:
                return getAllData(path);
            case uri.getOne:
                return getOneData(path, id);
            case uri.add:
                return addData(path, data);
            case uri.edit:
                return editData(path, id, data);
            case uri.delete:
                return deleteData(path, id);
            case uri.getRoomsNumber:
                return dataAvailableRoomsNumber((path));
            default:
                break;
        };
}