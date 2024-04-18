import { accessToLocalStorage } from "./accessToLocalStorage";
import { BOOKING_EXIST_PATH, SERVER, localStorageGetAction, localStorageTokenKey } from "./constants";

export const isExistBooking = async (id: string) => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${BOOKING_EXIST_PATH}/${id}`, {
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