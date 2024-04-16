import { accessToLocalStorage } from "./accessToLocalStorage";
import { ROOM_EXIST_PATH, SERVER, localStorageGetAction, localStorageTokenKey } from "./constants";

export const existRoomNumber = async (number: number): Promise<boolean> => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${ROOM_EXIST_PATH}/${number}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (apiData.ok) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
    return false;
}