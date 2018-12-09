
export function fetchApi(request, callback) {
    return fetch(request)
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            callback(responseJson);
        })
        .catch((error) => {
            console.log('Error');
            console.log(error);
        });
}