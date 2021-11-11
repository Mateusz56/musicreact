class FetchFunctions {
    static Get(route, params, successCallback) {
        let paramsString = '';

        if(params)
            for (const [key, value] of Object.entries(params)) {
                if(value || value === false)
                    paramsString += `${key}=${value}&`
            }

        console.log(params)
        console.log(paramsString)
        fetch(`http://localhost:8000/${route}/?${paramsString}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((respone) => respone.json())
            .then((json) => successCallback(json))
    }
}

export default FetchFunctions