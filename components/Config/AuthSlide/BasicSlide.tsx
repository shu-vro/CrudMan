import React from "react";
import { InputAuth } from ".";

export default function BasicSlide() {
    return (
        <div className="slide Basic">
            <h3>Basic Authentication</h3>
            <InputAuth FieldName="Username" />
            <InputAuth FieldName="Password" type="password" />
        </div>
    );
}
