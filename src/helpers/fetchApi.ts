
import { accessToLocalStorage } from "./accessToLocalStorage";
import { dataType } from "./callApi";
import { METHOD_DELETE, METHOD_GET, METHOD_POST, METHOD_PUT, SERVER, connectionError, localStorageGetAction, localStorageTokenKey } from "./constants";

type method = typeof METHOD_PUT | typeof METHOD_POST | typeof METHOD_DELETE | typeof METHOD_GET;


interface FetchApiProps {
    path: string,
    id?: string,
    data?: dataType
    method: method
}

export const fetchAPI = async ({ path, id, data, method }: FetchApiProps) => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    const apiData = await fetch(`${SERVER}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    );
    
    return await apiData;
}