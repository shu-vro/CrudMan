import { useEffect, useRef } from "react";
import { InputAuth } from ".";
import { useAuth } from "../../../utils/Auth";

export default function BasicSlide() {
    const formRef = useRef(null);
    const { setObject } = useAuth();
    const auth = useAuth();

    useEffect(() => {
        let form: HTMLFormElement = formRef.current;
        form.addEventListener("input", (e) => {
            e.preventDefault();
            let formData = new FormData(form);
            let username = formData.get("basic_username");
            let password = formData.get("basic_password");
            if (username === "") return setObject({ setObject });
            let Authorization = `basic ${Buffer.from(
                `${username}:${password}`
            ).toString("base64")}`;
            setObject({ Authorization, setObject });
        });
    }, [setObject]);

    useEffect(() => {
        console.log(auth);
    }, [auth]);

    return (
        <form className="slide Basic" ref={formRef}>
            <h3>Basic Authentication</h3>
            <InputAuth FieldName="Username" name="basic_username" />
            <InputAuth
                FieldName="Password"
                type="password"
                name="basic_password"
            />
        </form>
    );
}
