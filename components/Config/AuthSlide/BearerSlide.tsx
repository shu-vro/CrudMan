import { useEffect, useRef } from "react";
import { useAuth } from "../../../utils/Auth";

export default function BearerSlide() {
    const formRef = useRef(null);
    const { setObject } = useAuth();
    useEffect(() => {
        const form: HTMLFormElement = formRef.current;
        form.addEventListener("input", (e) => {
            e.preventDefault();
            let formData = new FormData(form);
            let Authorization = `bearer ${formData.get("bearer_token")}`;
            setObject({ Authorization, setObject });
        });
    }, [setObject]);

    return (
        <form className="slide Bearer" ref={formRef}>
            <h3>Bearer Token</h3>
            <textarea
                name="bearer_token"
                id="bearer_token"
                cols={40}
                rows={10}
            ></textarea>
        </form>
    );
}
