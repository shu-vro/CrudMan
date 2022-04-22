import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/keybinding-vscode";

export default function TextArea() {
    return (
        <div>
            <AceEditor
                placeholder="Type code."
                mode="json"
                theme="dracula"
                fontSize={14}
                width="100%"
                height="350px"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                onChange={(e) => {
                    try {
                        let result = JSON.parse(e);
                        console.log(result);
                    } catch (error) {
                        console.info(error);
                    }
                }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
                keyboardHandler="vscode"
                value={`{
    "hello": "world",
    "bool": true
}`}
            />
        </div>
    );
}
