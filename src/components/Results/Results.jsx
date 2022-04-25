import { useEffect } from "react";
import { useApiData } from "../../utils/ApiData";
import Table from "./Table";

export default function Results() {
    let apiData = useApiData();

    useEffect(() => {
        // console.log(apiData);
    }, [apiData]);
    return (
        <div>
            <h1>HI</h1>
            <Table header={{}} content={apiData?.headers} />
        </div>
    );
}
