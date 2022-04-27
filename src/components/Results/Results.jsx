import { useEffect } from "react";
import { useApiData } from "../../utils/ApiData";
import CommonSliderAssets from "../CommonSliderAssets";
import Table from "./Table";
import StatusBar from "./StatusBar";
import styles from "../../css/App.module.scss";

export default function Results() {
    let apiData = useApiData();

    useEffect(() => {
        // console.log(apiData);
    }, [apiData]);
    return (
        <div className={styles.config}>
            <StatusBar />
            <CommonSliderAssets
                lists={["Response", "Headers", "Cookies", "Results"]}
                defaultCheck="Response"
            >
                <div className="slide Response slide-selected">
                    <h1>Response</h1>
                    <Table header={{}} content={apiData?.headers || {}} />
                </div>
                <div className="slide Headers">
                    <h1>Headers</h1>
                    <Table header={{}} content={apiData?.headers || {}} />
                </div>
                <div className="slide Cookies">
                    <h1>Cookies</h1>
                    <Table header={{}} content={apiData?.headers || {}} />
                </div>
                <div className="slide Results">
                    <h1>Results</h1>
                    <Table header={{}} content={apiData?.headers || {}} />
                </div>
            </CommonSliderAssets>
        </div>
    );
}
