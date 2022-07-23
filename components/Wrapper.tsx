import {
    ApiDataContext,
    AuthContext,
    CodeContext,
    HeaderContext,
    HistoryContext,
    ParamContext,
    PostBodyContext,
    TestContext,
    ThemeContext,
    UrlDataContext,
    EnvironmentContext,
} from "@utils/utils";
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
                                    <CodeContext>
                                        <AuthContext>
                                            <HistoryContext>
                                                <EnvironmentContext>
                                                    {children}
                                                </EnvironmentContext>
                                            </HistoryContext>
                                        </AuthContext>
                                    </CodeContext>
                                </TestContext>
                            </ThemeContext>
                        </UrlDataContext>
                    </PostBodyContext>
                </HeaderContext>
            </ParamContext>
        </ApiDataContext>
    );
}
