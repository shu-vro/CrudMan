import { useEffect, useRef, useId } from "react";
import { InputAuth } from ".";
import { useAuth } from "../../../utils/Auth";
import { useParams } from "../../../utils/Params";

export default function APIKeySlide() {
    const formRef = useRef(null);
    const { setObject } = useAuth();
    const { setObject: setParams } = useParams();
    useEffect(() => {
        let methodFromAuthSlide: string = "APIKey";
        const form: HTMLFormElement = formRef.current;
        form.addEventListener("input", (e) => {
            e.preventDefault();
            let formData = new FormData(form);
            let key = formData.get("api_access_key");
            let checkbox = formData.get("api_access_checkbox");
            let value = formData.get("api_access_value");
            if (key === "")
                return setObject({
                    headers: {},
                    params: {},
                    setObject,
                    methodFromAuthSlide: "",
                });
            if (checkbox === "on") {
                setObject((prev) => {
                    return {
                        ...prev,
                        headers: {},
                        params: { [key as string]: value },
                        setObject,
                        methodFromAuthSlide,
                    };
                });
            } else {
                setObject((prev) => {
                    return {
                        ...prev,
                        headers: { [key as string]: value },
                        params: {},
                        setObject,
                        methodFromAuthSlide,
                    };
                });
            }
        });
    }, [setObject, setParams]);
    let id = useId();
    return (
        <form className="slide APIKey" ref={formRef}>
            <h3>Basic Authentication</h3>
            <label htmlFor={id}>Include in Query</label>
            <input
                type="checkbox"
                name="api_access_checkbox"
                id={id}
                value="on"
                title="Either to store the API key in the query or in headers."
            />
            <InputAuth FieldName="Key" name="api_access_key" />
            <InputAuth FieldName="Value" name="api_access_value" />
        </form>
    );
}
