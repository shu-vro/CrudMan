import React from "react";
import styles from "../../css/App.module.scss";
import UrlInput from "./UrlInput";
import { QuerySlide, HeaderSlide, BodySlide, TestSlide } from ".";
import CommonSliderAssets from "../CommonSliderAssets";

export default function Config() {
    return (
        <div className={styles.config}>
            <UrlInput />
            <Sliders />
        </div>
    );
}

function Sliders() {
    return (
        <CommonSliderAssets
            lists={["Query", "Header", "Body", "Test"]}
            defaultCheck="Query"
        >
            <QuerySlide />
            <HeaderSlide />
            <BodySlide />
            <TestSlide />
        </CommonSliderAssets>
    );
}
