import MessageBar from "./MessageBar";

class FetchFunctions {
    static Get(route, params, successCallback) {
        let paramsString = '/';

        if(params) {
            paramsString += '?';
            for (const [key, value] of Object.entries(params)) {
                if(value || value === false)
                    paramsString += `${key}=${value}&`
            }
        }

        fetch(`http://localhost:8000/${route}${paramsString}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((response) => response.json())
            .then((json) => successCallback(json)).catch(() => MessageBar.ShowError(`Coś poszło nie tak! GET ${route}`))
    }

    static Post(route, body, successCallback, failCallback = null) {
        fetch(`http://localhost:8000/${route}/`, {
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
        fetch(`http://localhost:8000/${route}`, {
            method: "DELETE",
            headers: {
                'content-type': "application/json",
            },
        }).then(() => successCallback()).catch(() => MessageBar.ShowError(`Coś poszło nie tak! DELETE ${route}`))
    }

    static Put(route, body, successCallback) {
        fetch(`http://localhost:8000/${route}/`, {
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