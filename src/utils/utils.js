import axios from "axios";

/**
 *
 * @param {String} baseURL - url to fetch
 * @param {String} method - get/post/put/patch/delete
 * @param {Object} headers - headers object to send
 * @param {Object} params - params object to send
 * @param {Object} data - data object to send in post/put/patch request
 * @returns Response
 */
export async function request(
    baseURL,
    method = "get",
    headers = {},
    params = {},
    data = {}
) {
    try {
        const instance = axios.create({
            baseURL,
            method,
            headers,
            params,
            data,
        });
        const response = await instance.request();
        return response;
    } catch (error) {
        return {
            ...error.response,
        };
    }
}

/**
 *
 * @param {String} baseURL - url to fetch
 * @param {String} method - get/post/put/patch/delete
 * @param {Object} headers - headers object to send
 * @param {Object} params - params object to send
 * @param {Object} data - data object to send in post/put/patch request
 * @returns {AxiosInstance} AxiosInstance
 */
export async function test(
    baseURL,
    method = "get",
    headers = {},
    params = {},
    data = {}
) {
    // try {
    //     const instance = axios.create({
    //         baseURL,
    //         method,
    //         headers,
    //         params,
    //     });
    //     return instance.arguments;
    // } catch (error) {
    //     return {
    //         ...error.response,
    //     };
    // }
    const result = new URL(baseURL);
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
            const value = params[key];
            result.searchParams.append(key, value);
        }
    }
    return result;
}
