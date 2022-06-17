import { useEffect, useState } from "react";
import CommonSliderAssets from "../../CommonSliderAssets";
import { useAuth } from "../../../utils/Auth";
import {
    NoneSlide,
    BasicSlide,
    BearerSlide,
    OAuth2Slide,
    APIKeySlide,
} from ".";

export default function AuthSlide() {
    const [listBullets, setListBullets] = useState([0, 0, 0, 0, 0]);
    const auth = useAuth();
    let lists = ["None", "Basic", "Bearer", "APIKey", "OAuth2"];
    useEffect(() => {
        setListBullets([
            auth.methodFromAuthSlide === "None" ? 1 : 0,
            auth.methodFromAuthSlide === "basic" ? 1 : 0,
            auth.methodFromAuthSlide === "bearer" ? 1 : 0,
            auth.methodFromAuthSlide === "APIKey" ? 1 : 0,
            auth.methodFromAuthSlide === "OAuth2" ? 1 : 0,
        ]);
    }, [auth]);

    return (
        <div className="slide Auth">
            <h2>Auth</h2>
            <CommonSliderAssets
                lists={lists}
                listBullets={listBullets}
                defaultCheck="None"
                ulName="child-list-ul">
                <NoneSlide />
                <BasicSlide />
                <BearerSlide />
                <APIKeySlide />
                <OAuth2Slide />
            </CommonSliderAssets>
        </div>
    );
}
