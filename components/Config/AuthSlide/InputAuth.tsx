import React from "react";
import { v4 } from "uuid";

export default function InputAuth({
    FieldName,
    FieldValue = "",
    type = "text",
    rest = { width: "70%" },
}) {
    let id = v4();
    return (
        <div className="input-place">
            <label htmlFor={id}>{FieldName}</label>
            <input
                type={type}
                id={id}
                defaultValue={FieldValue}
                style={{ ...rest }}
            />
        </div>
    );
}
