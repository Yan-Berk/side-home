const fetchProperties = async () => {
    const auth = btoa("simplyrets:simplyrets");
    ApiClient.setHeader("Authorization", "Basic  " + auth);
    return ApiClient.get("https://api.simplyrets.com/properties");
};

class ApiClient {
    static headers = new Headers();

    static get(url) {
        return fetch(url, { headers: ApiClient.headers })
            .then(res => res.json())
            .then((result) => {
                return result;
            }, (error) => {
                console.log(error.message);
            })
    }

    static setHeader(headerKey, headerValue) {
        ApiClient.headers.append(headerKey, headerValue);
    }
}

export {
    fetchProperties
}