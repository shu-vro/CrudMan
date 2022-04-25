import { ParamContext } from "../../utils/Params";
import { HeaderContext } from "../../utils/Headers";
import { PostBodyContext } from "../../utils/Body";

import React from "react";

export default function Wrapper({ children }) {
    return (
        <ParamContext>
            <HeaderContext>
                <PostBodyContext>{children}</PostBodyContext>
            </HeaderContext>
        </ParamContext>
    );
}
