import MySweetAlertApi from "../app/MySweetAlertApi";
import { FakesUri, iBooking, iEmployee, iMessage, iRoom } from "../entities/Data";
import { METHOD_DELETE, METHOD_POST, METHOD_PUT, SERVER, connectionError, dataNotFoundError, forbiddenError, localStorageGetAction, localStorageTokenKey, statusCodeErrorNotFound, statusCodeForbidden, statusCodeOk, statusCodeUnauthorized, unauthorizedError } from "./constants";
import { useLocalStorage } from "./useLocalStorage";

type dataType = iEmployee | iBooking | iMessage | iRoom;

const getAllData = async (path: string) => {
    const token = useLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        );

        const json = await apiData.json();
        if (apiData.status === statusCodeOk) {
            return await json.data;
        } else if (apiData.status === statusCodeForbidden) {
            MySweetAlertApi({ title: forbiddenError, icon: 'error' })
        } else if (apiData.status === statusCodeUnauthorized) {
            MySweetAlertApi({ title: unauthorizedError, icon: 'error' })
        }
    } catch (error) {
        console.error(error);
    }
};

const getOneData = async (path: string, id: string) => {
    const token = useLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        console.log(`${SERVER}${path}/${id}`);
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await apiData.json();
        if (apiData.status === statusCodeOk) {
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {
            MySweetAlertApi({ title: dataNotFoundError, icon: 'error' })
        } else if (apiData.status === statusCodeForbidden) {
            MySweetAlertApi({ title: forbiddenError, icon: 'error' })
        } else if (apiData.status === statusCodeUnauthorized) {
            MySweetAlertApi({ title: unauthorizedError, icon: 'error' })
        }
    } catch (error) {
        console.error(error);
    }
};

const addData = async (path: string, data: dataType) => {
    const token = useLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
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
        if (apiData.status === statusCodeOk) {
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {
            MySweetAlertApi({ title: dataNotFoundError, icon: 'error' })
        } else if (apiData.status === statusCodeForbidden) {
            MySweetAlertApi({ title: forbiddenError, icon: 'error' })
        } else if (apiData.status === statusCodeUnauthorized) {
            MySweetAlertApi({ title: unauthorizedError, icon: 'error' })
        }
    } catch (error) {
        console.error(error);
    }
};

const editData = async (path: string, id: string, data: dataType) => {
    const token = useLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
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
        if (apiData.status === statusCodeOk) {
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {
            MySweetAlertApi({ title: dataNotFoundError, icon: 'error' })
        } else if (apiData.status === statusCodeForbidden) {
            MySweetAlertApi({ title: forbiddenError, icon: 'error' })
        } else if (apiData.status === statusCodeUnauthorized) {
            MySweetAlertApi({ title: unauthorizedError, icon: 'error' })
        }
    } catch (error) {
        console.error(error);
    }
}

const deleteData = async (path: string, id: string) => {
    const token = useLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
            method: METHOD_DELETE,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await apiData.json();
        if (apiData.status === statusCodeOk) {
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {
            MySweetAlertApi({ title: dataNotFoundError, icon: 'error' })
        } else if (apiData.status === statusCodeForbidden) {
            MySweetAlertApi({ title: forbiddenError, icon: 'error' })
        } else if (apiData.status === statusCodeUnauthorized) {
            MySweetAlertApi({ title: unauthorizedError, icon: 'error' })
        }
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError })
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