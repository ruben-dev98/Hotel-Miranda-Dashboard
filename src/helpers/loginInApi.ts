
import MySweetAlertApi from '../app/MySweetAlertApi';
import { LOGIN_PATH, METHOD_POST, SERVER, loginSuccessful, statusCodeErrorNotFound, statusCodeOk } from './constants';
import { personalMessage } from './personalMessage';

export const loginInApi = async (email: string, password: string) => {
    try {
        const apiData = await fetch(`${SERVER}${LOGIN_PATH}`, {
            method: METHOD_POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const json = await apiData.json();
        if (apiData.ok) {
            MySweetAlertApi({ title: loginSuccessful, icon: 'success' })
            return await json.data;
        } else if(apiData.status === statusCodeErrorNotFound) {
            MySweetAlertApi({ title: `${personalMessage(LOGIN_PATH)} could not be found`, icon: 'error' })
        } else {
            MySweetAlertApi({ title: json.data, icon: 'error' })
        }
        return null;
    } catch(error) {
        console.error(error);
    }
};