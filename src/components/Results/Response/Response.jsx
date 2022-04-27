import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-searchbox";

export default function Response({ data }) {
    return (
        <div className="slide Response slide-selected">
            <h2>Response</h2>
            <AceEditor
                placeholder="Type code."
                mode="json"
                theme="dracula"
                fontSize={14}
                width="100%"
                height="calc(100% - 100px)"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                readOnly={true}
                wrapEnabled={true}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    useWorker: true,
                    tabSize: 4,
                }}
                value={`${JSON.stringify(data, null, 4)}`}
            />
        </div>
    );
}
