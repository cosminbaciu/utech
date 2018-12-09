export function createRequest(method, url, headers, body) {

    switch(method) {
        case 'GET':
            return new Request(url, {
                headers: headers,
                credentials: 'include'
            });
        case 'POST' :
            return new Request(url, {
                method: method,
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(body)
            });
    }
}