import React from "react";
import CommonSliderAssets from "../../CommonSliderAssets";
import { NoneSlide, BasicSlide, BearerSlide, AwsSlide, APIKeySlide } from ".";

export default function AuthSlide() {
    let lists = ["None", "Basic", "Bearer", "APIKey", "Aws"];
    return (
        <div className="slide Auth">
            <h2>Auth</h2>
            <CommonSliderAssets
                lists={lists}
                listBullets={[0, 0, 0, 0, 0]}
                defaultCheck="None"
                ulName="child-list-ul"
            >
                <NoneSlide />
                <BasicSlide />
                <BearerSlide />
                <APIKeySlide />
                <AwsSlide />
            </CommonSliderAssets>
        </div>
    );
}
