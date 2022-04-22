import React from "react";
import TextArea from "./TextArea";

export default function BodySlide() {
    return (
        // https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.min.js
        <div className="slide Header">
            <h2>Content</h2>
            <TextArea />
        </div>
    );
}
