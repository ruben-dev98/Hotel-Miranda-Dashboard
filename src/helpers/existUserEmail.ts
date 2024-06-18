import { iEmployee } from "../entities/Data";
import { accessToLocalStorage } from "./accessToLocalStorage";
import { EMPLOYEE_EXIST_PATH, SERVER, localStorageGetAction, localStorageTokenKey } from "./constants";

export const existUserEmail = async (email: string): Promise<iEmployee | undefined> => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${EMPLOYEE_EXIST_PATH}/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await apiData.json();
        if (apiData.ok) {
            return await json.data;
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
}