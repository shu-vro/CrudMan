import { useParams } from "@utils/Params";
import AceCodeEditor from "components/Editors/AceCodeEditor";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";
import useDeviceType from "hooks/useDeviceType";
import { useState } from "react";

export default function GraphQlEditor() {
    const param = useParams();
    const [value, setValue] = useState(``);
    const isMobile = useDeviceType();

    return (
        <>
            <h2>GraphQl Query</h2>
            {isMobile === "mobile" ? (
                <AceCodeEditor
                    value={value}
                    mode="puppet"
                    onChange={value => {
                        setValue(value);
                        param.setObject(prev => ({ query: value }));
                    }}
                />
            ) : (
                <MonacoCodeEditor
                    language="graphql"
                    onChange={value => {
                        setValue(value);
                        param.setObject(prev => ({ query: value }));
                    }}
                    value={value}
                />
            )}
        </>
    );
}
