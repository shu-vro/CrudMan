import React from "react";
import CommonSliderAssets from "../../CommonSliderAssets";
import { NoneSlide, BasicSlide, BearerSlide } from ".";

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
                <BasicSlide />
                <BearerSlide />
            </CommonSliderAssets>
        </div>
    );
}
