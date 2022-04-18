import axios from "axios";

/**
 *
 * @param {String} url - url to fetch
 * @param {String} method - get/post/put/patch/delete
 * @param {Object} headers - headers object to send
 * @param {Object} params - params object to send
 * @returns Response
 */
export default async function request(
    url,
    method = "get",
    headers = {},
    params = {}
) {
    try {
        const response = await axios({
            url,
            method,
            headers,
            params,
        });
        return response;
    } catch (error) {
        return {
            ...error.response,
        };
    }
}
