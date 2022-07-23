// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://jsonplaceholder.typicode.com/comments/1
import axios, { AxiosResponse } from "axios";
import { NextApiResponse } from "next";

type queryType = {
    [key: string]: string;
};

export default async function handler(req, res: NextApiResponse) {
    let {
        params: paramsString,
        headers: headersString,
        body,
        url,
        method,
    }: queryType = req.query;

    process.env.NODE_ENV === "development" && console.log("processing...");
    let start = Date.now();
    try {
        if (
            paramsString === undefined ||
            headersString === undefined ||
            body === undefined ||
            method === undefined
        ) {
            res.status(507).json({
                data: {
                    message: "Please provide all the required parameters",
                },
                headers: {},
                status: 507,
                statusText: "INSUFFICIENT_PARAMETERS",
                size: 0,
                elapsedTime: 0,
            });
        }
        let params = JSON.parse(paramsString);
        let headers = JSON.parse(headersString);
        let data = JSON.parse(body);
        let response: AxiosResponse;
        if (method.toLowerCase() === "post" || method.toLowerCase() === "put") {
            response = await axios({
                method,
                baseURL: url,
                headers,
                params,
                data,
                responseType: "arraybuffer",
            });
        } else {
            response = await axios({
                method,
                baseURL: url,
                headers,
                params,
                responseType: "arraybuffer",
            });
        }
        let elapsedTime = Date.now() - start;
        res.status(200).json({
            data: new TextDecoder("utf-8").decode(response.data),
            arrayBuffer: response.data,
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            size: JSON.stringify(response.data || {}, null, 0).length,
            elapsedTime,
        });
        process.env.NODE_ENV === "development" && console.log("sent!");
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
        process.env.NODE_ENV === "development" && console.log("error!");
    }
}
