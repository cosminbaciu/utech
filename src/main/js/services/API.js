import { createRequest } from "./utils/create-request.js";
import { fetchApi } from "./utils/fetch-api.js";
import { parametersToString } from "./utils/build-parameters.js";

const headers = {
    myHeaders: new Headers(),
    json(){
        this.myHeaders = new Headers();
        this.myHeaders.append('Content-Type', 'application/json');
        this.myHeaders.append('Accept', 'application/json');
        return this.myHeaders;
    }
};

export const API = {

    getSubdivisions(callback) {
        const request = createRequest("GET", "/api/backoffice/localitiesRegionsEdit/subdivisions",
            headers.json(), null);
        fetchApi(request, callback);
    },

    getSubdivisionLocalities(callback, parameters) {
        const parametersAsString = parametersToString(parameters);
        const request = createRequest("GET", "/api/backoffice/localitiesRegionsEdit/localities" +
            parametersAsString, headers.json(), null);
        fetchApi(request, callback);
    },

    getRegions(callback) {
        const request = createRequest("GET", "/api/backoffice/regionsEdit/regions",
            headers.json(), null);
        fetchApi(request, callback);
    },


    getSkuItemTypes(callback) {
        const request = createRequest("GET", "/api/backoffice/regionsEdit/skuItemTypes",
            headers.json(), null);
        fetchApi(request, callback);
    },

    getLocality(callback, parameters) {
        const parametersAsString = parametersToString(parameters);
        const request = createRequest("GET", "/api/backOffice/localitiesRegionsEdit/locality" +
            parametersAsString, headers.json(), null);
        fetchApi(request, callback);
    },

    getVoucherTypes(callback) {
        const request = createRequest("GET", "/api/backOffice/vouchers/voucherTypes",
            headers.json(), null);
        fetchApi(request, callback);
    },

    deleteRegionsFromLocality(callback, bodyObj) {
        const request = createRequest("POST", "/api/backOffice/localitiesRegionsEdit/deleteRegionsFromLocality",
            headers.json(), bodyObj);
        fetchApi(request, callback);
    },

    addRegionsToLocality(callback, bodyObj) {
        const request = createRequest("POST", "/api/backOffice/localitiesRegionsEdit/addRegionsToLocality",
            headers.json(), bodyObj);
        fetchApi(request, callback);
    },

    deleteRegions(callback, bodyObj) {
        const request = createRequest("POST", "/api/backOffice/regionsEdit/deleteRegions",
            headers.json(), bodyObj);
        fetchApi(request, callback);
    },

    addRegions(callback, bodyObj) {
        const request = createRequest("POST", "/api/backOffice/regionsEdit/addRegions",
            headers.json(), bodyObj);
        fetchApi(request, callback);
    },

    addVoucher(callback, bodyObj) {
        const request = createRequest("POST", "/api/backOffice/vouchers/addVoucher",
            headers.json(), bodyObj);
        fetchApi(request, callback);
    }

}