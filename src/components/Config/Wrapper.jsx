import { ParamContext } from "../../utils/Params";
import { HeaderContext } from "../../utils/Headers";

import React from "react";

export default function Wrapper({ children }) {
    return (
        <ParamContext>
            <HeaderContext>{children}</HeaderContext>
        </ParamContext>
    );
}
