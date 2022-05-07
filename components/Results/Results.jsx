import { useEffect, useState } from "react";
import { useApiData } from "../../utils/ApiData";
import CommonSliderAssets from "../CommonSliderAssets";
import Table from "./Table";
import StatusBar from "./StatusBar";
import TestResult from "./TestResult";
import styles from "../../css/App.module.scss";
import { Response } from "./index";

export default function Results() {
    let apiData = useApiData();
    const [listBullets, setListBullets] = useState([]);

    useEffect(() => {
        let responseNum = 0;
        let headersNum = Object.keys(apiData.headers || {}).length;
        let cookiesNum = 0;
        let resultsNum = 0;
        setListBullets([responseNum, headersNum, cookiesNum, resultsNum]);
    }, [apiData]);
    return (
        <div className={styles.results}>
            <StatusBar
                status={apiData.status}
                statusText={apiData.statusText}
                size={JSON.stringify(apiData?.data || {}, null, 0).length}
                time={apiData.elapsedTime}
            />
            <CommonSliderAssets
                lists={["Response", "Headers", "Cookies", "Results"]}
                listBullets={listBullets}
                defaultCheck="Response"
            >
                <Response data={apiData?.data || {}} />
                <Headers headers={apiData?.headers || {}} />
                <div className="slide Cookies">
                    <h2>Cookies</h2>
                    <p>No cookies found</p>
                </div>
                <TestResult />
            </CommonSliderAssets>
        </div>
    );
}

function Headers({ headers }) {
    return (
        <div className="slide Headers">
            <h2>Headers</h2>
            <Table content={headers} />
        </div>
    );
}
