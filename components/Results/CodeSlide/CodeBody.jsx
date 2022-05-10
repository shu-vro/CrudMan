import dynamic from "next/dynamic";

const AceEditor = dynamic(
    async () => {
        let ace = await import("react-ace");
        require("ace-builds/src-noconflict/mode-text");
        require("ace-builds/src-noconflict/mode-json");
        require("ace-builds/src-noconflict/mode-javascript");
        require("ace-builds/src-noconflict/mode-python");
        require("ace-builds/src-noconflict/mode-dart");
        require("ace-builds/src-noconflict/mode-csharp");
        require("ace-builds/src-noconflict/theme-dracula");
        require("ace-builds/src-noconflict/theme-github");
        require("ace-builds/src-noconflict/ext-searchbox");
        require("ace-builds/src-noconflict/keybinding-vscode");
        return ace;
    },
    {
        ssr: false,
        loading: () => <div>Loading editor...</div>,
    }
);

import { useState, useEffect } from "react";
import { useTheme } from "../../../utils/Theme";
import { useCode } from "../../../utils/Code";
import { useHeaders } from "../../../utils/Headers";
import { useUrlData } from "../../../utils/UrlData";
import { usePostBody } from "../../../utils/Body";

export default function CodeBody() {
    const { value: theme } = useTheme();
    const { selectCode } = useCode();
    let headers = useHeaders();
    let urlData = useUrlData();
    let body = usePostBody();
    const [config, setConfig] = useState({});

    useEffect(() => {
        console.log(headers);
    }, [headers]);

    useEffect(() => {
        switch (selectCode) {
            case "C# HttpClient":
                let copyBody = { ...body };
                delete copyBody["setObject"];
                let copyHeaders = { ...headers };
                delete copyHeaders["setObject"];
                console.log(copyHeaders);
                let boilerplate = `var client = new HttpClient();
var request = new HttpRequestMessage();
request.RequestUri = new Uri("${urlData.url}");
request.Method = HttpMethod.${urlData.method};

request.Headers.Add("Accept", "*/*");
request.Headers.Add("User-Agent", "Thunder Client (https://www.thunderclient.com)");

var bodyString = "${JSON.stringify(copyBody).replaceAll(`"`, `\\"`)}";
var content = new StringContent(bodyString, Encoding.UTF8, "application/json");
request.Content = content;

var response = await client.SendAsync(request);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`;
                setConfig({ mode: "csharp", boilerplate });
                break;
            case "Dart Http":
                setConfig({ mode: "dart" });
                break;
            case "Javascript Axios":
                setConfig({ mode: "javascript" });
                break;
            case "Javascript Fetch":
                setConfig({ mode: "javascript" });
                break;
            case "Python Http.client":
                setConfig({ mode: "python" });
                break;
            case "Python Requests":
                setConfig({ mode: "python" });
                break;

            default:
                setConfig({ mode: "text" });
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCode]);

    return (
        <AceEditor
            placeholder="Type code."
            mode={config.mode}
            theme={theme === "dark" ? "dracula" : "github"}
            fontSize={14}
            width="100%"
            height="calc(100% - 100px)"
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            wrapEnabled={true}
            // readOnly={true}
            setOptions={{
                showLineNumbers: true,
                useWorker: false,
                tabSize: 4,
            }}
            defaultValue={config.boilerplate}
        />
    );
}
