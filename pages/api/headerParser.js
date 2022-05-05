// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://jsonplaceholder.typicode.com/comments/1
import axios from "axios";

export default async function handler(req, res) {
    let { params, headers, body, url, method } = req.query;

    let instance = axios.create({
        baseURL: url,
        method,
        params,
        headers: JSON.parse(headers),
    });
    body = JSON.parse(body);
    try {
        let response = await instance.request({ data: { ...body } });
        res.status(200).json({
            data: response.data,
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
        });
    } catch (error) {
        res.status(200).json({
            data: error.response.data,
            headers: error.response.headers,
            status: error.response.status,
            statusText: error.response.statusText,
        });
    }
}
