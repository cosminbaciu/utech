export function parametersToString(parameters) {
    let stringParams = '';
    if (parameters) {
        stringParams = '?';
        var key;
        for (key in parameters) {
            stringParams += `${key}=${parameters[key]}&`;
        }
    }
    return stringParams;
}