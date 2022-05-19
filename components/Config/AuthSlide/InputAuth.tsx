import React from "react";

export default function InputAuth({
    FieldName,
    FieldValue = "",
    type = "text",
    style = { width: "70%" },
    name,
}) {
    let id = React.useId();
    return (
        <div className="input-place">
            <label htmlFor={id}>{FieldName}</label>
            <input
                type={type}
                id={id}
                defaultValue={FieldValue}
                style={style}
                name={name}
            />
        </div>
    );
}
