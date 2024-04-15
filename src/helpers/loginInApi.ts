
import MySweetAlertApi from '../app/MySweetAlertApi';
import { METHOD_POST, SERVER, dataNotFoundError, forbiddenError, loginSuccessful, statusCodeErrorNotFound, statusCodeForbidden, statusCodeOk, statusCodeUnauthorized, unauthorizedError } from './constants';

export const loginInApi = async (email: string, password: string) => {
    try {
        const apiData = await fetch(`${SERVER}/login`, {
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
        if (apiData.status === statusCodeOk) {
            MySweetAlertApi({ title: loginSuccessful, icon: 'success' })
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {
            MySweetAlertApi({ title: dataNotFoundError, icon: 'error' })
        } else if (apiData.status === statusCodeForbidden) {
            MySweetAlertApi({ title: forbiddenError, icon: 'error' })
        } else if (apiData.status === statusCodeUnauthorized) {
            MySweetAlertApi({ title: unauthorizedError, icon: 'error' })
        }
    } catch(error) {
        console.error(error);
    }
};