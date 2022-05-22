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
            let operation = prop.operation;
            let value = prop.value;
            let text = `${propName} ${operation} ${value}`;
            setTests((test) => ({ ...test, [text]: "refreshing..." }));
            if (operation === "equals to") {
                if (headers[propName] && headers[propName] === value) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            } else if (operation === "not equals to") {
                if (headers[propName] && headers[propName] !== value) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            } else if (operation === "count") {
                if (
                    headers[propName] &&
                    Number(headers[propName]) &&
                    Number(value) &&
                    headers[propName] === value
                ) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            } else if (operation === "contains") {
                if (headers[value]?.toLowerCase()) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            } else if (operation === "is less than or equal") {
                if (
                    headers[propName] &&
                    Number(headers[propName]) &&
                    Number(value) &&
                    Number(headers[propName]) <= Number(value)
                ) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            } else if (operation === "is greater than or equal") {
                if (
                    headers[propName] &&
                    Number(headers[propName]) &&
                    Number(value) &&
                    Number(headers[propName]) >= Number(value)
                ) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            } else if (operation === "is less than") {
                if (
                    headers[propName] &&
                    Number(headers[propName]) &&
                    Number(value) &&
                    Number(headers[propName]) < Number(value)
                ) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            } else if (operation === "is greater than") {
                if (
                    headers[propName] &&
                    Number(headers[propName]) &&
                    Number(value) &&
                    Number(headers[propName]) > Number(value)
                ) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            } else if (operation === "matched regex expression") {
                if (
                    headers[propName] &&
                    headers[propName].match(stringToRegex(value))
                ) {
                    setTests((tests) => ({ ...tests, [text]: "passed" }));
                } else {
                    setTests((tests) => ({ ...tests, [text]: "failed" }));
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiData]);

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
