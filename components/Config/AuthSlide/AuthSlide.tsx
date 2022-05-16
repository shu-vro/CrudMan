import React from "react";
import CommonSliderAssets from "../../CommonSliderAssets";
import { NoneSlide } from ".";
import { buffer } from "../../../utils/utils";

export default function AuthSlide() {
    let lists = ["None", "Basic", "Bearer"];
    return (
        <div className="slide Auth">
            <h2>Auth</h2>
            <CommonSliderAssets
                lists={lists}
                listBullets={[0, 0, 0]}
                defaultCheck="None"
                ulName="child-list-ul"
            >
                <NoneSlide />
                <div className="slide Basic">
                    <h3>Basic</h3>
                </div>
                <div className="slide Bearer">
                    <h3>Bearer</h3>
                </div>
            </CommonSliderAssets>
            <p>{buffer("foo", "bar")}</p>
        </div>
    );
}
