import dynamic from "next/dynamic";

const AceEditor = dynamic(
    async () => {
        let ace = await import("react-ace");
        require("ace-builds/src-noconflict/mode-vbscript");
        require("ace-builds/src-noconflict/mode-json");
        require("ace-builds/src-noconflict/mode-javascript");
        require("ace-builds/src-noconflict/mode-python");
        require("ace-builds/src-noconflict/mode-dart");
        require("ace-builds/src-noconflict/mode-csharp");
        require("ace-builds/src-noconflict/theme-dracula");
        require("ace-builds/src-noconflict/theme-xcode");
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
    const { selectCode, setObject } = useCode();
    let headers = useHeaders();
    let urlData = useUrlData();
    let body = usePostBody();
    const [config, setConfig] = useState({});

    useEffect(() => {
        setObject((prev) => ({ ...prev, code: config.boilerplate }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config]);

    useEffect(() => {
        let copyBody = { ...body };
        delete copyBody["setObject"];
        let copyHeaders = { ...headers };
        delete copyHeaders["setObject"];

        let copyBodyString = JSON.stringify(copyBody, null, 4);
        let copyHeaderString = JSON.stringify(copyHeaders, null, 4);
        let methodString = urlData.method.toUpperCase();
        if (selectCode === "C# HttpClient") {
            let headerString = Object.entries(copyHeaders)
                .map((i) => {
                    return `request.Headers.Add("${i[0]}", "${i[1]}");`;
                })
                .join("\n");
            let boilerplate = `var client = new HttpClient();
var request = new HttpRequestMessage();
request.RequestUri = new Uri("${urlData.url}");
request.Method = HttpMethod.${urlData.method};

${headerString}

var bodyString = "${JSON.stringify(copyBody).replaceAll(`"`, `\\"`)}";
var content = new StringContent(bodyString, Encoding.UTF8, "application/json");
request.Content = content;

var response = await client.SendAsync(request);
var result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`;
            setConfig({ mode: "csharp", boilerplate });
        } else if (selectCode === "Dart Http") {
            let boilerplate = `var headersList = ${copyHeaderString}
var url = Uri.parse('${urlData.url}');

var body = ${copyBodyString}
var req = http.Request('${methodString}', url);
req.headers.addAll(headersList);
req.body = json.encode(body);

var res = await req.send();
final resBody = await res.stream.bytesToString();

if (res.statusCode >= 200 && res.statusCode < 300) {
    print(resBody);
}
else {
    print(res.reasonPhrase);
}`;
            setConfig({ mode: "dart", boilerplate });
        } else if (selectCode === "Javascript Axios") {
            let boilerplate = `import axios from "axios";

let headersList = ${copyHeaderString}

let bodyContent = JSON.stringify(${copyBodyString});

let reqOptions = {
    method: '${urlData.method}',
    url: '${urlData.url}',
    headers: headerList,
    data: bodyContent,
}

axios(reqOptions).then(function (response) {
    console.log(response.data);
})`;
            setConfig({ mode: "javascript", boilerplate });
        } else if (selectCode === "Javascript Fetch") {
            let boilerplate = `let headersList = ${copyHeaderString}

let bodyContent = JSON.stringify(${copyBodyString});

fetch("http://jsonplaceholder.typicode.com/comments?postId=1", { 
    method: "${methodString}",
    body: bodyContent,
    headers: headersList
}).then(function(response) {
    return response.text();
}).then(function(data) {
    console.log(data);
})`;
            setConfig({ mode: "javascript", boilerplate });
        } else if (selectCode === "Python Http.client") {
            let urlRegex =
                /(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/gi;
            let urlArray = urlData.url.split(urlRegex); // 4, 5 and 6 has desired output
            console.log(urlArray);
            let boilerplate = `import http.client
import json

conn = http.client.HTTPSConnection("${urlArray[4]}")

headersList = ${copyHeaderString.replaceAll("true", "True")}

payload = json.dumps(${copyBodyString.replaceAll("true", "True")})

conn.request("${methodString}", "${urlArray[5]}${
                urlArray[6]
            }", payload, headersList)
response = conn.getresponse()
result = response.read()

print(result.decode("utf-8"))`;
            setConfig({ mode: "python", boilerplate });
        } else if (selectCode === "Python Requests") {
            let boilerplate = `import requests
import json

reqUrl = "${urlData.url}"

headersList = ${copyHeaderString.replaceAll("true", "True")}

payload = json.dumps(${copyBodyString.replaceAll("true", "True")})})

response = requests.request("${methodString}", reqUrl, data=payload,  headers=headersList)

print(response.text)`;
            setConfig({ mode: "python", boilerplate });
        } else if (selectCode === "cURL") {
            let headerString = Object.entries(copyHeaders)
                .map((i) => {
                    return `\t--header '${i[0]}: ${i[1]}' \\`;
                })
                .join("\n");
            let boilerplate = `curl -X GET \
'${urlData.url}' 
    --data-raw '${copyBodyString}'
    --header 'Content-Type: application/json'
${headerString}`;
            setConfig({ mode: "vbscript", boilerplate });
        } else if (selectCode === "PowerShell") {
            let headerString = Object.entries(copyHeaders)
                .map((i) => {
                    return `$headers.Add("${i[0]}", "${i[1]}")`;
                })
                .join("\n");
            let boilerplate = `$headers = @{}
${headerString}
$headers.Add("Content-Type", "application/json")

$reqUrl = '${urlData.url}'
$body = '${copyBodyString}'

$response = Invoke-RestMethod -Uri $reqUrl -Method ${
                urlData.method
            } -Headers $headers -ContentType 'application/json' ${
                urlData.method === "Post" || urlData.method === "Put"
                    ? "-Body $body"
                    : ""
            }
$response | ConvertTo-Json`;
            setConfig({ mode: "vbscript", boilerplate });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCode, headers, body, urlData]);

    return (
        <AceEditor
            placeholder="Type code."
            mode={config.mode}
            theme={theme === "dark" ? "dracula" : "xcode"}
            fontSize={14}
            width="100%"
            height="calc(100% - 100px)"
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            wrapEnabled={true}
            keyboardHandler="vscode"
            readOnly={true}
            setOptions={{
                showLineNumbers: true,
                useWorker: false,
                tabSize: 4,
            }}
            value={config.boilerplate}
        />
    );
}
