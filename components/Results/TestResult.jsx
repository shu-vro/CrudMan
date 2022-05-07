import { useEffect, useState } from "react";
import Table from "./Table";
import { useTest } from "../../utils/Test";
import { useApiData } from "../../utils/ApiData";

export default function TestResult() {
    const [tests, setTests] = useState({});
    let { props } = useTest();
    let apiData = useApiData();
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
            }
        });
        console.log(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiData]);

    return (
        <div className="slide Results">
            <h2>Results</h2>
            <Table content={tests} testing={true} />
        </div>
    );
}
