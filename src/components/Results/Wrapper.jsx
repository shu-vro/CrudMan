import React from "react";
import { ApiDataContext } from "../../utils/ApiData";

export default function Wrapper({ children }) {
    return <ApiDataContext>{children}</ApiDataContext>;
}
