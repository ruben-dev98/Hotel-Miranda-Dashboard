import MySweetAlertApi from "../app/MySweetAlertApi";
import { FakesUri, iBooking, iEmployee, iMessage, iRoom } from "../entities/Data";
import { METHOD_DELETE, METHOD_GET, METHOD_POST, METHOD_PUT, connectionError} from "./constants";
import { personalMessage } from "./personalMessage";
import { fetchAPI } from "./fetchApi";

export type dataType = iEmployee | iBooking | iMessage | iRoom;

interface CallApiProps {
    path: string,
    operation: number,
    methods: FakesUri,
    id?: string,
    data?: dataType
}

const getAllData = async (path: string) => {
    try {
        const apiData = await fetchAPI({path: path, method: METHOD_GET})
        const json = await apiData?.json();
        if (apiData?.ok) {
            return await json.data;
        }
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' })
    }
};

const getOneData = async (path: string, id: string) => {
    try {
        const apiData = await fetchAPI({path: path, id: id, method: METHOD_GET})

        const json = await apiData?.json();
        if (apiData?.ok) {
            return await json.data;
        }
        MySweetAlertApi({ title: `${personalMessage(path)} #${id} could not be found`, icon: 'success' });
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' })
    }
};

const addData = async (path: string, data: dataType | undefined) => {
    try {
        const apiData = await fetchAPI({path: path, method: METHOD_POST, data: data})

        const json = await apiData?.json();
        if (apiData?.ok) {
            MySweetAlertApi({ title: `${personalMessage(path)} #${json.data._id} was successfully added`, icon: 'success' })
            return await json.data;
        }
        MySweetAlertApi({ title: json.data, icon: 'error' });
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' });
    }
};

const editData = async (path: string, id: string, data: dataType | undefined) => {
    try {
        const apiData = await fetchAPI({path: path, id: id, method: METHOD_PUT, data: data});
        const json = await apiData?.json();
        if (apiData?.ok) {
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
    try {
        const apiData = await fetchAPI({path: path, id: id, method: METHOD_DELETE})
        const json = await apiData?.json();
        if (apiData?.ok) {
            return await json.data;
        }
        MySweetAlertApi({ title: `${personalMessage(path)} #${id} could not be found`, icon: 'success' })
    } catch (error) {
        console.error(error);
        MySweetAlertApi({ title: connectionError, icon: 'error' });
    }
};

const dataAvailableRoomsNumber = async (path: string) => {
    try {
        const apiData = await fetchAPI({path: path, method: METHOD_GET})
        const json = await apiData?.json();
        if (apiData?.ok) {
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

export const callAPI = ({path, operation, methods, id, data} : CallApiProps) => {
        switch (operation) {
            case methods.getAll:
                return getAllData(path);
            case methods.getOne:
                return getOneData(path, id || '');
            case methods.add:
                return addData(path, data);
            case methods.edit:
                return editData(path, id || '', data);
            case methods.delete:
                return deleteData(path, id || '');
            case methods.getRoomsNumber:
                return dataAvailableRoomsNumber((path));
            default:
                break;
        };
}