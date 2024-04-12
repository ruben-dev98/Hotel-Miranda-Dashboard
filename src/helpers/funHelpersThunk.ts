import { FakesUri, iBooking, iEmployee, iMessage, iRoom } from "../entities/Data";
import { METHOD_DELETE, METHOD_POST, METHOD_PUT, SERVER, localStorageGetAction, localStorageTokenKey, statusCodeErrorNotFound, statusCodeForbidden, statusCodeOk, statusCodeUnauthorized } from "./constants";
import { useLocalStorage } from "./useLocalStorage";

type dataType = iEmployee | iBooking | iMessage | iRoom;

const getAllData = async (path: string) => {
    const token = useLocalStorage({key: localStorageTokenKey, action: localStorageGetAction}) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        );
        if(apiData.status === statusCodeOk) {
            const json = await apiData.json();
            return await json.data;
        } else if (apiData.status === statusCodeForbidden) {

        } else if(apiData.status === statusCodeUnauthorized) {

        }
    } catch (error) {
        console.error(error);
    }
};

const getOneData = async (path: string, id: string) => {
    const token = useLocalStorage({key: localStorageTokenKey, action: localStorageGetAction}) || '';
    try {
        console.log(`${SERVER}${path}/${id}`);
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(apiData.status === statusCodeOk) {
            const json = await apiData.json();
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {

        } else if (apiData.status === statusCodeForbidden) {

        } else if(apiData.status === statusCodeUnauthorized) {

        }
    } catch (error) {
        console.error(error);
    }
};

const addData = async (path: string, data: dataType) => {
    const token = useLocalStorage({key: localStorageTokenKey, action: localStorageGetAction}) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}`, {
            method: METHOD_POST,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(apiData.status === statusCodeOk) {
            const json = await apiData.json();
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {

        } else if (apiData.status === statusCodeForbidden) {

        } else if(apiData.status === statusCodeUnauthorized) {

        }
    } catch (error) {
        console.error(error);
    }
};

const editData = async (path: string, id: string, data: dataType) => {
    const token = useLocalStorage({key: localStorageTokenKey, action: localStorageGetAction}) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
            method: METHOD_PUT,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(apiData.status === statusCodeOk) {
            const json = await apiData.json();
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {

        } else if (apiData.status === statusCodeForbidden) {

        } else if(apiData.status === statusCodeUnauthorized) {

        }
    } catch (error) {
        console.error(error);
    }
}

const deleteData = async (path: string, id: string) => {
    const token = useLocalStorage({key: localStorageTokenKey, action: localStorageGetAction}) || '';
    try {
        const apiData = await fetch(`${SERVER}${path}/${id}`, {
        method: METHOD_DELETE,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if(apiData.status === statusCodeOk) {
        const json = await apiData.json();
        return await json.data;
    } else if (apiData.status === statusCodeErrorNotFound) {
        
    } else if (apiData.status === statusCodeForbidden) {

    } else if(apiData.status === statusCodeUnauthorized) {

    }
    } catch(error){
        console.error(error);
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

export const FakeApi = (path: string, operation: number, uri: FakesUri, id = '', data: dataType = {} as dataType) => {
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
                reject('Array not found');
                break;
        }
    });
}