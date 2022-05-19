import { useEffect, useRef } from "react";
import { InputAuth } from ".";
export default function BasicSlide() {
    const formRef = useRef(null);
    useEffect(() => {
        let form: HTMLFormElement = formRef.current;
        form.addEventListener("input", (e) => {
            e.preventDefault();
            let formData = new FormData(form);
            type data = {} | any;
            let data: data = Object.fromEntries(formData.entries());
            data = Object.values(data);
            let authString = `basic ${Buffer.from(
                `${data?.[0]}:${data?.[1]}`
            ).toString("base64")}`;
            console.log(authString);
        });
    });

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
