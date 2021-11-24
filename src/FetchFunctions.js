import MessageBar from "./MessageBar";
import NavBar from "./NavBar";
import AuthToken from "./AuthToken";

class FetchFunctions {
    //static backendUrl = 'http://127.0.0.1:8000/'
    static backendUrl = 'https://inzynierka.bieda.it/'

    static Get(route, params, successCallback) {
        let paramsString = '/';

        if(params) {
            paramsString += '?';
            for (const [key, value] of Object.entries(params)) {
                if(value || value === false)
                    paramsString += `${key}=${value}&`
            }
        }

        fetch(`${this.backendUrl}${route}${paramsString}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'Authorization': AuthToken.token ? `Token ${AuthToken.token}` : ''
            }
        }).then((response) => response.json())
            .then((json) => successCallback(json)).catch(() => MessageBar.ShowError(`Coś poszło nie tak! GET ${route}`))
    }

    static Post(route, body, successCallback, failCallback = null) {
        fetch(`${this.backendUrl}${route}/`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if(response.status >= 200 && response.status <= 299)
                successCallback(response);
            else
            {
                if(failCallback != null)
                    failCallback(response)
                else
                    MessageBar.ShowError(`Coś poszło nie tak! POST ${route}`)
            }
        }).catch(() => MessageBar.ShowError(`Coś poszło nie tak! POST ${route}`))
    }

    static Delete(route, successCallback) {
        fetch(`${this.backendUrl}${route}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
            },
        }).then(() => successCallback()).catch(() => MessageBar.ShowError(`Coś poszło nie tak! DELETE ${route}`))
    }

    static Put(route, body, successCallback) {
        fetch(`${this.backendUrl}${route}/`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if(response.status >= 200 && response.status <= 299)
                response.json().then((json) => successCallback(json));
        }).catch(() => MessageBar.ShowError(`Coś poszło nie tak! DELETE ${route}`))
    }
}

export default FetchFunctions