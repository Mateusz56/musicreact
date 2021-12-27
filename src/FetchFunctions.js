import MessageBar from "./MessageBar";
import AuthToken from "./AuthToken";

class FetchFunctions {
    static backendUrl = 'https://musicback.toadres.pl/'
    //backendUrl = 'http://127.0.0.1:8000/'

    static async GetExecute(route, params, successCallback, cancelFlag) {
        try {
            let paramsString = '/';

            if(params) {
                paramsString += '?';
                for (const [key, value] of Object.entries(params)) {
                    if(value || value === false)
                        paramsString += `${key}=${value}&`
                }
            }

            let response = await fetch(`${this.backendUrl}${route}${paramsString}`, {
                method: "GET",
                headers: {
                    'content-type': "application/json",
                    'Authorization': AuthToken.token ? `Token ${AuthToken.token}` : ''
                }
            })
            if(cancelFlag.cancel)
                return

            let json = await response.json()

            if(cancelFlag.cancel)
                return

            successCallback(json, response)
        }
        catch {
            MessageBar.ShowError(`Coś poszło nie tak! GET ${route}`)
        }
    }

    static Get(route, params, successCallback) {
        let cancelFlag = {cancel: false}
        this.GetExecute(route, params, successCallback, cancelFlag)
        return cancelFlag
    }

    static async Post(route, body, successCallback, failCallback = null) {
        try {
            let response = await fetch(`${this.backendUrl}${route}/`, {
                method: "POST",
                headers: {
                    'content-type': "application/json",
                    'Authorization': AuthToken.token ? `Token ${AuthToken.token}` : ''
                },
                body: JSON.stringify(body)
            })

            if (response.status >= 200 && response.status <= 299)
                successCallback(response);
            else if (failCallback != null)
                failCallback(response)
            else
                MessageBar.ShowError(`Coś poszło nie tak! POST ${route}`)
        }
        catch {
            MessageBar.ShowError(`Coś poszło nie tak! POST ${route}`)
        }
    }

    static Delete(route, successCallback) {
        fetch(`${this.backendUrl}${route}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
                'Authorization': AuthToken.token ? `Token ${AuthToken.token}` : ''
            },
        }).then(() => successCallback()).catch(() => MessageBar.ShowError(`Coś poszło nie tak! DELETE ${route}`))
    }

    static Put(route, body, successCallback, failCallback = null) {
        fetch(`${this.backendUrl}${route}/`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
                'Authorization': AuthToken.token ? `Token ${AuthToken.token}` : ''
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if(response.status >= 200 && response.status <= 299)
                response.json().then((json) => successCallback(json))
            else if (failCallback != null) {
                failCallback(response)
            }
            else {
                MessageBar.ShowError(`Coś poszło nie tak! PUT ${route}`)
            }
        }).catch(() => MessageBar.ShowError(`Coś poszło nie tak! PUT ${route}`))
    }
}

export default FetchFunctions