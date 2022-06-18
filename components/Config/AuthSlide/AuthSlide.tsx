import { useState } from "react";
import { useAuth } from "../../../utils/Auth";
import {
    NoneSlide,
    BasicSlide,
    BearerSlide,
    OAuth2Slide,
    APIKeySlide,
} from ".";

export default function AuthSlide() {
    const auth = useAuth();
    let lists = ["None", "Basic", "Bearer", "APIKey", "OAuth2"];
    const [component, setComponent] = useState(null);

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
