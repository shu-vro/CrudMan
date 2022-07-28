import { useEffect, useState } from "react";
import { useApiData } from "@utils/ApiData";
import { useTest } from "@utils/Test";
import CommonSliderAssets from "../CommonSliderAssets";
import Table from "./Table/Table";
import StatusBar from "./StatusBar";
import TestResults from "./TestResults/TestResults";
import Code from "./CodeSlide/Code";
import styles from "@styles/App.module.scss";
import { Response } from "./index";

export default function Results() {
    let { object: apiData } = useApiData();
    let { props } = useTest();
    const [listBullets, setListBullets] = useState([]);

    useEffect(() => {
        let responseNum = 0;
        let headersNum = Object.keys(apiData.headers || {}).length;
        let resultsNum = props.length;
        let codeNum = 0;
        setListBullets([responseNum, headersNum, resultsNum, codeNum]);
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
                lists={["Response", "Headers", "Results", "Code"]}
                listBullets={listBullets}
                defaultCheck="Response">
                <Response
                    data={`${
                        typeof apiData?.data !== "object"
                            ? apiData?.data || JSON.stringify({})
                            : JSON.stringify(apiData?.data || {}, null, 2)
                    }`}
                    isFinished={apiData?.isFinished}
                    contentType={apiData?.headers?.[`content-type`]}
                    arrayBuffer={apiData?.arrayBuffer}
                />
                <Headers headers={apiData?.headers || {}} />
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
