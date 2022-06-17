// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://jsonplaceholder.typicode.com/comments/1
import axios from "axios";
import { NextApiResponse } from "next";

export default async function handler(req, res: NextApiResponse) {
    let { params, headers, body, url, method } = req.query;

    console.log("processing...");
    let start = Date.now();
    try {
        params = JSON.parse(params);
        headers = JSON.parse(headers);
        let data = JSON.parse(body);
        let response = await axios({
            method,
            baseURL: url,
            headers,
            params,
            data,
        });
        let elapsedTime = Date.now() - start;
        res.status(200).json({
            data: response.data,
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            size: JSON.stringify(response.data || {}, null, 0).length,
            elapsedTime,
        });
        console.log("sent!");
    } catch (error) {
        let elapsedTime = Date.now() - start;
        if (error.response) {
            res.status(200).json({
                data: error.response?.data,
                headers: error.response?.headers,
                status: error.response?.status,
                statusText: error.response?.statusText,
                elapsedTime,
            });
        } else {
            res.status(200).json({
                data: {},
                headers: {},
                status: 404,
                statusText: error.code,
                elapsedTime,
            });
        }
        console.log("error!", error);
    }
}
