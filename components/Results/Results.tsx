import { useEffect, useState } from "react";
import { useApiData } from "../../utils/ApiData";
import { useTest } from "../../utils/Test";
import CommonSliderAssets from "../CommonSliderAssets";
import Table from "./Table";
import StatusBar from "./StatusBar";
import TestResults from "./TestResults/TestResults";
import Code from "./CodeSlide/Code";
import styles from "../../css/App.module.scss";
import { Response } from "./index";

export default function Results() {
    let { object: apiData } = useApiData();
    let { props } = useTest();
    const [listBullets, setListBullets] = useState([]);

    useEffect(() => {
        let responseNum = 0;
        let headersNum = Object.keys(apiData.headers || {}).length;
        let cookiesNum = 0;
        let resultsNum = props.length;
        let codeNum = 0;
        setListBullets([
            responseNum,
            headersNum,
            cookiesNum,
            resultsNum,
            codeNum,
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiData]);
    return (
        <div className={styles.results}>
            <StatusBar
                status={apiData.status}
                statusText={apiData.statusText}
                size={apiData.size}
                time={apiData.elapsedTime}
            />
            <CommonSliderAssets
                lists={["Response", "Headers", "Cookies", "Results", "Code"]}
                listBullets={listBullets}
                defaultCheck="Response">
                <Response
                    data={apiData?.data || {}}
                    isFinished={apiData?.isFinished}
                />
                <Headers headers={apiData?.headers || {}} />
                <div className="slide Cookies">
                    <h2>Cookies</h2>
                    <p>No cookies found</p>
                </div>
                <TestResults />
                <Code />
            </CommonSliderAssets>
        </div>
    );
}

function Headers({ headers }) {
    return (
        <div className="slide Headers">
            <h2>Headers</h2>
            <Table content={headers} header={["Headers", "Value"]} />
        </div>
    );
}
