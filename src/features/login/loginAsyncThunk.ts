
import { METHOD_POST, SERVER, statusCodeErrorNotFound, statusCodeForbidden, statusCodeOk, statusCodeUnauthorized } from '../../helpers/constants';
import { delay } from '../../helpers/funHelpersThunk';

export const loginInApi = async (email: string, password: string) => {
    await delay();
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
        if(apiData.status === statusCodeOk) {
            const json = await apiData.json();
            return await json.data;
        } else if (apiData.status === statusCodeErrorNotFound) {

        } else if (apiData.status === statusCodeForbidden) {

        } else if(apiData.status === statusCodeUnauthorized) {

        }
        
    } catch(error) {
        console.error(error);
    }
};