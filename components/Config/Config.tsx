import { useState, useEffect } from "react";
import styles from "@styles/App.module.scss";
import UrlInput from "./UrlInput";
import { QuerySlide, HeaderSlide, AuthSlide, BodySlide, TestSlide } from ".";
import CommonSliderAssets from "../CommonSliderAssets";
import { useParams } from "@utils/Params";
import { useHeaders } from "@utils/Headers";
import { useTest } from "@utils/Test";
import { useAuth } from "@utils/Auth";
import { usePostBody } from "@utils/Body";

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
    const postBody = usePostBody();
    const test = useTest();
    const auth = useAuth();

    useEffect(() => {
        let paramsNum = Object.keys(params.object || {}).length;
        let headersNum = Object.keys(headers.object || {}).length;
        let bodyNum = Object.keys(postBody.object || {}).length;
        let authNum =
            Object.keys(auth.headers || {}).length > 0 ||
            Object.keys(auth.params || {}).length > 0
                ? 1
                : 0;
        let testNum = test.props.length;
        setListBullets([paramsNum, headersNum, bodyNum, authNum, testNum]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.object, headers.object, postBody.object, test.props, auth]);
    return (
        <CommonSliderAssets
            lists={["Query", "Header", "Body", "Auth", "Test"]}
            listBullets={listBullets}
            defaultCheck="Query">
            <QuerySlide />
            <HeaderSlide />
            <BodySlide />
            <AuthSlide />
            <TestSlide />
        </CommonSliderAssets>
    );
}
