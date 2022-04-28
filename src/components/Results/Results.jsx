import { useEffect } from "react";
import { useApiData } from "../../utils/ApiData";
import CommonSliderAssets from "../CommonSliderAssets";
import Table from "./Table";
import StatusBar from "./StatusBar";
import styles from "../../css/App.module.scss";
import { Response } from "./index";

export default function Results() {
    let apiData = useApiData();

    useEffect(() => {
        // console.log(JSON.stringify(apiData?.data || {}, null, 0));
    }, [apiData]);
    return (
        <div className={styles.results}>
            <StatusBar
                status={apiData.status}
                size={JSON.stringify(apiData?.data || {}, null, 0).length}
                time={apiData.elapsedTime}
            />
            <CommonSliderAssets
                lists={["Response", "Headers", "Cookies", "Results"]}
                defaultCheck="Response"
            >
                <Response data={apiData?.data || {}} />
                <div className="slide Headers">
                    <h2>Headers</h2>
                    <Table header={{}} content={apiData?.headers || {}} />
                </div>
                <div className="slide Cookies">
                    <h2>Cookies</h2>
                    <p>No cookies found</p>
                </div>
                <div className="slide Results">
                    <h2>Results</h2>
                    <p>Will be available soon!</p>
                </div>
            </CommonSliderAssets>
        </div>
    );
}
