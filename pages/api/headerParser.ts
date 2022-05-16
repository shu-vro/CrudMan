// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://jsonplaceholder.typicode.com/comments/1
import axios from "axios";

export default async function handler(req, res) {
    let { params, headers, body, url, method } = req.query;

    let start = Date.now();
    try {
        let response = await axios({
            method,
            baseURL: url,
            headers: JSON.parse(headers),
            params,
            data: JSON.parse(body),
        });
        let elapsedTime = Date.now() - start;
        res.status(200).json({
            data: response.data,
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            elapsedTime,
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            data: error.response.data,
            headers: error.response.headers,
            status: error.response.status,
            statusText: error.response.statusText,
            elapsedTime: "null",
        });
    }
}