import { ParamContext } from "../utils/Params";
import { HeaderContext } from "../utils/Headers";
import { PostBodyContext } from "../utils/Body";
import { ApiDataContext } from "../utils/ApiData";
import { UrlDataContext } from "../utils/UrlData";
import React from "react";

export default function Wrapper({ children }) {
    return (
        <ApiDataContext>
            <ParamContext>
                <HeaderContext>
                    <PostBodyContext>
                        <UrlDataContext>{children}</UrlDataContext>
                    </PostBodyContext>
                </HeaderContext>
            </ParamContext>
        </ApiDataContext>
    );
}
