import { ParamContext } from "../utils/Params";
import { HeaderContext } from "../utils/Headers";
import { PostBodyContext } from "../utils/Body";
import { ApiDataContext } from "../utils/ApiData";
import { UrlDataContext } from "../utils/UrlData";
import { ThemeContext } from "../utils/Theme";
import { TestContext } from "../utils/Test";
import { CodeContext } from "../utils/Code";
import React from "react";

export default function Wrapper({ children }) {
    return (
        <ApiDataContext>
            <ParamContext>
                <HeaderContext>
                    <PostBodyContext>
                        <UrlDataContext>
                            <ThemeContext>
                                <TestContext>
                                    <CodeContext>{children}</CodeContext>
                                </TestContext>
                            </ThemeContext>
                        </UrlDataContext>
                    </PostBodyContext>
                </HeaderContext>
            </ParamContext>
        </ApiDataContext>
    );
}
