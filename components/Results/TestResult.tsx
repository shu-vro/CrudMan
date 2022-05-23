import { useEffect, useState } from "react";
import Table from "./Table";
import { useTest } from "../../utils/Test";
import { useApiData } from "../../utils/ApiData";

export default function TestResult() {
    const [tests, setTests] = useState({});
    let { props } = useTest();
    let apiData = useApiData();

    function stringToRegex(s: string): RegExp {
        var m = [];
        return (m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/))
            ? new RegExp(
                  m[2],
                  m[3]
                      .split("")
                      .filter(
                          (i: number, p: any, s: any[]) => s.indexOf(i) === p
                      )
                      .join("")
              )
            : new RegExp(s);
    }
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
                        case "is less than":
                            var reason = ` - Actual: content-type is a string. It cannot be compared to a number.`;
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "is greater than":
                            var reason = ` - Actual: content-type is a string. It cannot be compared to a number.`;
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "is less than or equal":
                            var reason = ` - Actual: content-type is a string. It cannot be compared to a number.`;
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
                            break;
                        case "is greater than or equal":
                            var reason = ` - Actual: content-type is a string. It cannot be compared to a number.`;
                            setTests((tests) => ({
                                ...tests,
                                [text + reason]: "failed",
                            }));
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
                        default:
                            break;
                    }
                    break;

                case "Response-Body":
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
