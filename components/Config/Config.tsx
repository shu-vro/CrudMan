import { useState, useEffect } from "react";
import styles from "../../css/App.module.scss";
import UrlInput from "./UrlInput";
import { QuerySlide, HeaderSlide, AuthSlide, BodySlide, TestSlide } from ".";
import CommonSliderAssets from "../CommonSliderAssets";
import { useParams } from "../../utils/Params";
import { useHeaders } from "../../utils/Headers";
import { useTest } from "../../utils/Test";

export default function Config() {
    return (
        <div className={styles.config}>
            <UrlInput />
            <Sliders />
        </div>
    );
}

function Sliders() {
    const [listBullets, setListBullets] = useState([]);
    const params = useParams();
    const headers = useHeaders();
    const test = useTest();

    useEffect(() => {
        let paramsNum = Object.keys(params || {}).length - 1;
        let headersNum = Object.keys(headers || {}).length - 1;
        let bodyNum = 0;
        let authNum = 0;
        let testNum = test.props.length;
        setListBullets([paramsNum, headersNum, bodyNum, authNum, testNum]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, headers, test]);
    return (
        <CommonSliderAssets
            lists={["Query", "Header", "Body", "Auth", "Test"]}
            listBullets={listBullets}
            defaultCheck="Query"
        >
            <QuerySlide />
            <HeaderSlide />
            <BodySlide />
            <AuthSlide />
            <TestSlide />
        </CommonSliderAssets>
    );
}
