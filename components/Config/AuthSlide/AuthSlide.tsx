import { useState, useEffect, useRef } from "react";
import { useAuth } from "@utils/Auth";
import { useHistorySaver } from "@utils/HistorySaver";
import {
    NoneSlide,
    BasicSlide,
    BearerSlide,
    OAuth2Slide,
    APIKeySlide,
} from ".";

export default function AuthSlide() {
    const auth = useAuth();
    const selectRef = useRef(null);
    const historySaver = useHistorySaver();
    let lists = ["None", "Basic", "Bearer", "APIKey", "OAuth2"];
    const [component, setComponent] = useState(null);

    useEffect(() => {
        let index = lists.findIndex(
            e =>
                e.toLowerCase() ===
                historySaver.defaultObject.authMethod.toLowerCase()
        );
        (selectRef.current as HTMLSelectElement).selectedIndex =
            index < 0 ? 0 : index;

        setTimeout(() => {
            selectRef.current?.dispatchEvent(
                new Event("change", {
                    bubbles: true,
                })
            );
        }, 100);
        auth.setObject(prev => ({
            ...prev,
            headers: historySaver.defaultObject.auth.headers,
            params: historySaver.defaultObject.auth.params,
            methodFromAuthSlide: historySaver.defaultObject.authMethod,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historySaver.defaultObject]);

    function handleOptionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === "Basic") {
            setComponent(<BasicSlide />);
        } else if (e.target.value === "Bearer") {
            setComponent(<BearerSlide />);
        } else if (e.target.value === "APIKey") {
            setComponent(<APIKeySlide />);
        } else if (e.target.value === "OAuth2") {
            setComponent(<OAuth2Slide />);
        } else {
            setComponent(<NoneSlide />);
            auth.setObject(prev => ({
                ...prev,
                headers: {},
                params: {},
                methodFromAuthSlide: "",
            }));
        }
    }

    return (
        <div className="slide Auth">
            <h2>Auth</h2>
            <label htmlFor="select_auth">Choose Option</label>
            <select
                name="someName"
                id="select_auth"
                className="select-transparent"
                style={{ margin: "0 20px", display: "inline-block" }}
                defaultValue={lists[0]}
                ref={selectRef}
                onChange={handleOptionChange}>
                {lists.map((li: string, i: number) => (
                    <option key={i} value={li}>
                        {li}
                    </option>
                ))}
            </select>
            {component}
        </div>
    );
}
