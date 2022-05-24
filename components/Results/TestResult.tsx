import { useEffect, useState } from "react";
import Table from "./Table";
import { useTest } from "../../utils/Test";
import { useApiData } from "../../utils/ApiData";
import {
    stringToRegex,
    getValueFromResponse,
    checkRegexKeyInResponse,
} from "../../utils/utils";

export default function TestResult() {
    const [tests, setTests] = useState({});
    let { props } = useTest();
    let apiData = useApiData();

    useEffect(() => {
        console.log(props);
    }, [props]);

    useEffect(() => {
        let headers = apiData?.headers || {};
        setTests({});

        props.forEach((prop) => {
            let propName = prop.key.toLowerCase();
            let section = prop.section;
            let operation = prop.operation;
            let value = prop.value;
            let text = `${propName} ${operation} ${value}`;
            switch (section) {
                case "Headers":
                    switch (operation) {
                        case "equals to":
                            if (
                                headers[propName] &&
                                headers[propName] === value
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[propName]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;

                        case "not equals to":
                            if (
                                headers[propName] &&
                                headers[propName] !== value
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[propName]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "count":
                            if (
                                headers[propName] &&
                                Number(headers[propName]) &&
                                Number(value) &&
                                headers[propName].length === Number(value)
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[propName]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "contains":
                            if (
                                headers[propName]
                                    .toLowerCase()
                                    .includes(value.toLowerCase())
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[propName]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than or equal":
                            if (
                                headers[propName] &&
                                Number(headers[propName]) &&
                                Number(value) &&
                                Number(headers[propName]) <= Number(value)
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[propName]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than or equal":
                            if (
                                headers[propName] &&
                                Number(headers[propName]) &&
                                Number(value) &&
                                Number(headers[propName]) >= Number(value)
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[propName]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than":
                            if (
                                headers[propName] &&
                                Number(headers[propName]) &&
                                Number(value) &&
                                Number(headers[propName]) < Number(value)
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[propName]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;

                        case "is greater than":
                            if (
                                headers[propName] &&
                                Number(headers[propName]) &&
                                Number(value) &&
                                Number(headers[propName]) > Number(value)
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[propName]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "matched regex expression":
                            if (
                                headers[propName] &&
                                headers[propName].match(stringToRegex(value))
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "failed",
                                }));
                            }
                            break;

                        case "type of":
                            if (
                                headers[propName] &&
                                typeof headers[propName] === value
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${typeof headers[
                                    propName
                                ]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;

                        default:
                            break;
                    }

                    break; // Headers

                case "Response-Time":
                    switch (operation) {
                        case "equals to":
                            if (apiData?.elapsedTime === Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.elapsedTime}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "not equals to":
                            if (apiData?.elapsedTime !== Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.elapsedTime}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than":
                            if (apiData?.elapsedTime < Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.elapsedTime}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than":
                            if (apiData?.elapsedTime > Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.elapsedTime}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than or equal":
                            if (apiData?.elapsedTime <= Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.elapsedTime}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than or equal":
                            if (apiData?.elapsedTime >= Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.elapsedTime}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;

                        case "matched regex expression":
                            if (
                                apiData?.elapsedTime
                                    .toString()
                                    .match(stringToRegex(value))
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "failed",
                                }));
                            }
                            break;

                        case "type of":
                            if (typeof apiData?.elapsedTime === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${typeof apiData?.elapsedTime}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;

                        case "contains":
                            var reason = ` - Cannot perform contains on non-string value`;
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;

                        case "count":
                            var reason = " - Value is not object or array";
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "type of":
                            if (typeof apiData?.elapsedTime === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${typeof apiData?.elapsedTime}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;

                        default:
                            break;
                    }
                    break;

                case "Content-Length":
                    switch (operation) {
                        case "equals to":
                            if (apiData?.size === Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.size}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "not equals to":
                            if (apiData?.size !== Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.size}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than":
                            if (apiData?.size < Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.size}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than":
                            if (apiData?.size > Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.size}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than or equal":
                            if (apiData?.size <= Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.size}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than or equal":
                            if (apiData?.size >= Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.size}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "matched regex expression":
                            if (
                                apiData?.size

                                    .toString()
                                    .match(stringToRegex(value))
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "failed",
                                }));
                            }
                            break;
                        case "contains":
                            var reason =
                                " - Cannot perform contains on non-string value";
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "count":
                            var reason = " - Value is not object or array";
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "type of":
                            if (typeof apiData?.size === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${typeof apiData?.size}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        default:
                            break;
                    }
                    break;

                case "Response-Code":
                    switch (operation) {
                        case "equals to":
                            if (apiData?.status === Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.status}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "not equals to":
                            if (apiData?.status !== Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.status}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than":
                            if (apiData?.status < Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.status}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than":
                            if (apiData?.status > Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.status}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than or equal":
                            if (apiData?.status <= Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.status}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than or equal":
                            if (apiData?.status >= Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${apiData?.status}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "matched regex expression":
                            if (
                                apiData?.status
                                    .toString()
                                    .match(stringToRegex(value))
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "failed",
                                }));
                            }
                            break;
                        case "contains":
                            var reason =
                                " - Cannot perform contains on non-string value";
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "count":
                            var reason = " - Value is not object or array";
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "type of":
                            if (typeof apiData?.status === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${typeof apiData?.status}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        default:
                            break;
                    }

                    break;

                case "Content-Type":
                    switch (operation) {
                        case "equals to":
                            if (
                                headers["content-type"]?.toLowerCase() === value
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[
                                    "content-type"
                                ]?.toLowerCase()}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "not equals to":
                            if (
                                headers["content-type"]?.toLowerCase() !== value
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${headers[
                                    "content-type"
                                ]?.toLowerCase()}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "matched regex expression":
                            if (
                                headers["content-type"]
                                    ?.toLowerCase()
                                    .match(stringToRegex(value))
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "failed",
                                }));
                            }
                            break;
                        case "contains":
                            var reason =
                                " - Cannot perform contains on non-string value";
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "count":
                            var reason = " - Value is not object or array";
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "type of":
                            if (typeof headers["content-type"] === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${typeof headers[
                                    "content-type"
                                ]}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        default:
                            break;
                    }

                    if (
                        operation === "is less than" ||
                        operation === "is greater than" ||
                        operation === "is less than or equal" ||
                        operation === "is greater than or equal"
                    ) {
                        var reason = ` - Actual: content-type is a string. It cannot be compared to a number.`;
                        setTests((tests) => ({
                            ...tests,
                            [text + reason]: "failed",
                        }));
                    }
                    break;

                case "Response-Body":
                    switch (operation) {
                        case "equals to":
                            if (JSON.stringify(apiData?.data) === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Response body does not matches.`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "not equals to":
                            if (JSON.stringify(apiData?.data) !== value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Response body does not matches.`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "count":
                            if (typeof apiData?.data === "object") {
                                if (
                                    Object.keys(apiData?.data).length ===
                                    Math.floor(Number(value))
                                ) {
                                    setTests((tests) => ({
                                        ...tests,
                                        [text]: "passed",
                                    }));
                                } else {
                                    let reason = ` - Actual length: ${
                                        Object.keys(apiData.data).length
                                    }`;
                                    setTests((tests) => ({
                                        ...tests,
                                        [text + reason]: "failed",
                                    }));
                                }
                            } else {
                                let reason = ` - Value is not object or array`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "contains":
                            if (
                                getValueFromResponse(apiData?.data, value)
                                    .length > 0
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Value is not present in the response body`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "matched regex expression":
                            if (
                                checkRegexKeyInResponse(
                                    apiData?.data,
                                    stringToRegex(value)
                                )
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Value is not present in the response body`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "type of":
                            if (typeof apiData?.data === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${typeof apiData?.data}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;

                        default:
                            break;
                    }

                    if (
                        operation === "is less than or equal" ||
                        operation === "is greater than or equal" ||
                        operation === "is less than" ||
                        operation === "is greater than"
                    ) {
                        var reason = ` - Actual result did not match the condition`;
                        setTests((tests) => ({
                            ...tests,
                            [text + reason]: "failed",
                        }));
                    }
                    break;

                case "Json-Query":
                    let json = apiData?.data;
                    var answer;
                    try {
                        if (propName.substring(0, 4) !== "json") {
                            throw new Error();
                        }
                        // console.log(propName.substring(0, 4));
                        answer = eval(propName);
                    } catch (error) {
                        setTests((tests) => ({
                            ...tests,
                            [text + " - Not a valid operation"]: "failed",
                        }));
                        break;
                    }
                    switch (operation) {
                        case "equals to":
                            if (answer === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${answer}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "not equals to":
                            if (answer !== value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual: ${answer}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "count":
                            if (typeof answer === "object") {
                                if (
                                    Object.keys(answer).length ===
                                    Math.round(Number(value))
                                ) {
                                    setTests((tests) => ({
                                        ...tests,
                                        [text]: "passed",
                                    }));
                                } else {
                                    let reason = ` - Actual length: ${
                                        Object.keys(answer).length
                                    }`;
                                    setTests((tests) => ({
                                        ...tests,
                                        [text + reason]: "failed",
                                    }));
                                }
                            } else {
                                let reason = ` - Value is not object or array`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "contains":
                            if (
                                answer
                                    .toLowerCase()
                                    .includes(value.toLowerCase())
                            ) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Cannot perform contains on non-string value`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "matched regex expression":
                            if (stringToRegex(value).test(answer)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual value: ${answer}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "type of":
                            if (typeof answer === value) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual type: ${typeof answer}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than or equal":
                            if (answer >= Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual value: ${answer}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than or equal":
                            if (answer <= Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual value: ${answer}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is less than":
                            if (answer < Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual value: ${answer}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;
                        case "is greater than":
                            if (answer > Number(value)) {
                                setTests((tests) => ({
                                    ...tests,
                                    [text]: "passed",
                                }));
                            } else {
                                let reason = ` - Actual value: ${answer}`;
                                setTests((tests) => ({
                                    ...tests,
                                    [text + reason]: "failed",
                                }));
                            }
                            break;

                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiData]);

    useEffect(() => {
        console.log(tests);
    }, [tests]);

    return (
        <div className="slide Results">
            <h2>Results</h2>
            <Table
                content={tests}
                testing={true}
                header={["Test", "Results"]}
            />
        </div>
    );
}
