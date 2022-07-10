import { useParams } from "@utils/Params";
import AceCodeEditor from "components/Editors/AceCodeEditor";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";
import useRecognizeMobile from "hooks/useRecognizeMobile";
import { useState } from "react";

export default function GraphQlEditor() {
    const param = useParams();
    const [value, setValue] = useState(``);
    const isMobile = useRecognizeMobile();

    return (
        <>
            <h2>GraphQl Query</h2>
            {isMobile !== "mobile" ? (
                <MonacoCodeEditor
                    language="graphql"
                    onChange={value => {
                        setValue(value);
                        param.setObject(prev => ({ query: value }));
                    }}
                    value={value}
                />
            ) : (
                <AceCodeEditor
                    value={value}
                    mode="puppet"
                    onChange={value => {
                        setValue(value);
                        param.setObject(prev => ({ query: value }));
                    }}
                />
            )}
        </>
    );
}
