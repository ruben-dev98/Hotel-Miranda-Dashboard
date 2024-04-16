import { iRoom } from "../entities/Data";
import { accessToLocalStorage } from "./accessToLocalStorage";
import { ROOM_EXIST_PATH, SERVER, localStorageGetAction, localStorageTokenKey } from "./constants";

export const existRoomNumber = async (number: number): Promise<iRoom | undefined> => {
    const token = accessToLocalStorage({ key: localStorageTokenKey, action: localStorageGetAction }) || '';
    try {
        const apiData = await fetch(`${SERVER}${ROOM_EXIST_PATH}/${number}`, {
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