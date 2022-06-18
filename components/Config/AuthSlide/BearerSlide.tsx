import { useEffect, useRef } from "react";
import { useAuth } from "../../../utils/Auth";

export default function BearerSlide() {
    const formRef = useRef(null);
    const { setObject } = useAuth();
    useEffect(() => {
        let methodFromAuthSlide: string = "bearer";
        const form: HTMLFormElement = formRef.current;
        form.addEventListener("input", e => {
            e.preventDefault();
            let formData = new FormData(form);
            let token = formData.get("bearer_token");
            if (token === "")
                return setObject(prev => {
                    return {
                        ...prev,
                        headers: {},
                        params: {},
                        setObject,
                        methodFromAuthSlide,
                    };
                });
            let Authorization = `${methodFromAuthSlide} ${token}`;
            setObject(prev => {
                return {
                    ...prev,
                    headers: { Authorization },
                    params: {},
                    setObject,
                    methodFromAuthSlide,
                };
            });
        });
    }, [setObject]);

    return (
        <form className="slide authSlide Bearer" ref={formRef}>
            <h3>Bearer Token</h3>
            <textarea
                name="bearer_token"
                id="bearer_token"
                cols={40}
                rows={10}></textarea>
        </form>
    );
}
