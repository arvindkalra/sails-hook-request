/**
 * @author Arvind Kalra <kalarvind97@gmail.com>
 * @profile https://github.com/arvindkalra
 * @date 07/02/21
 */
const axios = require('axios');
const _ = require('lodash');

const reqFunctions = {
    /**
     * @name {serviceName}.post
     * @description Make post request to the metrc api endpoint
     * @param { Object } opts          Options to make post request
     * @param { String } opts.url      Endpoint to make the request
     * @param { Object } opts.headers  Object having all the custom headers to be used to make this request
     * @param { Object } opts.params   Object having all the query params to be sent in the request
     * @param { Object } opts.data     Object to be sent as body to the request
     * */
    post: function (opts) {
        const requestOptions = {
            ...validateRequestObject(opts),
            method: "post",
            baseURL: this.baseUrl,
            auth: this.auth,
        };
        logRequest(requestOptions);
        return axios
            .request(requestOptions)
            .then(handleResponse)
            .catch(handleError);
    },
    /**
     * @name {serviceName}.get
     * @description Make get request to the metrc api endpoint
     * @param { Object } opts          Options to make post request
     * @param { String } opts.url      Endpoint to make the request
     * @param { Object } opts.headers  Object having all the custom headers to be used to make this request
     * @param { Object } opts.params   Object having all the query params to be sent in the request
     * @param { Object } opts.data     Object to be sent as body to the request
     * */
    get: function (opts) {
        const requestOptions = {
            ...validateRequestObject(opts),
            method: "get",
            baseURL: this.baseUrl,
            auth: this.auth,
        };
        logRequest(requestOptions);
        return axios
            .request(requestOptions)
            .then(handleResponse)
            .catch(handleError);
    },
    /**
     * @name {serviceName}.put
     * @description Make put request to the metrc api endpoint
     * @param { Object } opts          Options to make post request
     * @param { String } opts.url      Endpoint to make the request
     * @param { Object } opts.headers  Object having all the custom headers to be used to make this request
     * @param { Object } opts.params   Object having all the query params to be sent in the request
     * @param { Object } opts.data     Object to be sent as body to the request
     * */
    put: function (opts) {
        const requestOptions = {
            ...validateRequestObject(opts),
            method: "put",
            baseURL: this.baseUrl,
            auth: this.auth,
        };
        logRequest(requestOptions);
        return axios
            .request(requestOptions)
            .then(handleResponse)
            .catch(handleError);
    },
    /**
     * @name {serviceName}.delete
     * @description Make delete request to the metrc api endpoint
     * @param { Object } opts          Options to make post request
     * @param { String } opts.url      Endpoint to make the request
     * @param { Object } opts.headers  Object having all the custom headers to be used to make this request
     * @param { Object } opts.params   Object having all the query params to be sent in the request
     * @param { Object } opts.data     Object to be sent as body to the request
     * */
    delete: function (opts) {
        const requestOptions = {
            ...validateRequestObject(opts),
            method: "delete",
            baseURL: this.baseUrl,
            auth: this.auth,
        };
        logRequest(requestOptions);
        return axios
            .request(requestOptions)
            .then(handleResponse)
            .catch(handleError);
    },
    /**
     * @name {serviceName}.patch
     * @description Make patch request to the metrc api endpoint
     * @param { Object } opts          Options to make post request
     * @param { String } opts.url      Endpoint to make the request
     * @param { Object } opts.headers  Object having all the custom headers to be used to make this request
     * @param { Object } opts.params   Object having all the query params to be sent in the request
     * @param { Object } opts.data     Object to be sent as body to the request
     * */
    patch: function (opts) {
        const requestOptions = {
            ...validateRequestObject(opts),
            method: "patch",
            baseURL: this.baseUrl,
            auth: this.auth,
        };
        logRequest(requestOptions);
        return axios
            .request(requestOptions)
            .then(handleResponse)
            .catch(handleError);
    },
};

/**
 * @name Metrc
 * @description Create instance to make api requests to other services using basicAuth,
 * returns an instance which has all the services from param object with their get, post methods.
 * @param { Object } serviceCredentials       All the services with their baseUrl and auth object, with username and password
 * */
let sails;

module.exports = function (serviceCredentials, sailsGlobal) {
    sails = sailsGlobal;
    const services = Object.keys(serviceCredentials);
    for (let i = 0; i < services.length; i++) {
        const serviceName = services[i];
        this[serviceName] = {
            baseUrl: serviceCredentials[serviceName].baseUrl,
            auth: serviceCredentials[serviceName].auth,
            __proto__: reqFunctions,
        };
    }
}

const logRequest = (requestOptions) => {
    sails.log.info('Outgoing request');
    sails.log.info(requestOptions);
};

const logResponse = (requestOptions) => {
    sails.log.info('Incoming response');
    sails.log.info(requestOptions);
};

const validateRequestObject = (requestOptions) => {
    const selectedOptions = _.pick(requestOptions, [
        "url",
        "headers",
        "params",
        "data",
    ]);
    if (!_.has(selectedOptions, "url")) {
        throw new Error(
            "Url is required in request options for making the api request"
        );
    }
    return selectedOptions;
};

const handleResponse = (res) => {
    const response = res.data;
    logResponse(response);
    return response;
};

const handleError = (err) => {
    const errorResponse = _.get(err, 'response.data', "Failed to send this request");
    logResponse(errorResponse)
    throw errorResponse
}
