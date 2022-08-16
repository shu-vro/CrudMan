import { useState, useEffect } from "react";
import Mustache from "mustache";
import { useCode } from "@utils/Code";
import { useParams } from "@utils/Params";
import { useHeaders } from "@utils/Headers";
import { useAuth } from "@utils/Auth";
import { useUrlData } from "@utils/UrlData";
import { usePostBody } from "@utils/Body";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";
import AceCodeEditor from "components/Editors/AceCodeEditor";
import useDeviceType from "hooks/useDeviceType";
import { useEnvironment } from "@utils/Env";

export default function CodeBody() {
    const { selectCode, setObject } = useCode();
    const { object: headers } = useHeaders();
    const { object: queryParams } = useParams();
    let auth = useAuth();
    const environment = useEnvironment();
    const { object: urlData } = useUrlData();
    const { object: body } = usePostBody();
    const [config, setConfig] = useState({
        boilerplate: "",
        mode: "",
    });

    useEffect(() => {
        setObject(prev => ({ ...prev, code: config.boilerplate }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config]);

    useEffect(() => {
        let copyBody = body;
        delete copyBody["setObject"];
        let authHeaders = auth.headers;
        let copyHeaders = { ...headers, ...authHeaders };
        let queryParamsCopy = { ...queryParams, ...auth.params };
        delete copyHeaders["setObject"];
        let _url_with_env_vars = urlData?.url;
        let _baseurl_with_env_vars = urlData?.baseURL;
        try {
            copyHeaders = JSON.parse(
                Mustache.render(
                    JSON.stringify(copyHeaders),
                    environment.variables
                )
            );
        } catch (error) {}
        try {
            copyBody = JSON.parse(
                Mustache.render(JSON.stringify(copyBody), environment.variables)
            );
        } catch (error) {}
        try {
            queryParamsCopy = JSON.parse(
                Mustache.render(
                    JSON.stringify(queryParamsCopy),
                    environment.variables
                )
            );
        } catch (error) {}
        try {
            _url_with_env_vars = JSON.parse(
                Mustache.render(
                    JSON.stringify(_url_with_env_vars),
                    environment.variables
                )
            );
        } catch (error) {}
        try {
            _baseurl_with_env_vars = JSON.parse(
                Mustache.render(
                    JSON.stringify(_baseurl_with_env_vars),
                    environment.variables
                )
            );
        } catch (error) {}

        let urlRegex =
            /(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/gi;
        let urlArray = _url_with_env_vars.split(urlRegex); // 4, 5 and 6 has desired output
        try {
            urlArray = Mustache.render(
                urlData?.url,
                environment.variables
            ).split(urlRegex);
        } catch (error) {}
        let searchParams = new URLSearchParams(urlArray?.[6]);
        for (const key in queryParamsCopy) {
            searchParams.append(key, queryParamsCopy[key]);
        }
        let url = `${_baseurl_with_env_vars}?${searchParams.toString()}`;

        let copyBodyString = JSON.stringify(copyBody, null, 2);
        let copyHeaderString = JSON.stringify(copyHeaders, null, 2);
        let methodString = urlData.method.toUpperCase();
        if (selectCode === "C# HttpClient") {
            let headerString = Object.entries(copyHeaders)
                .map(i => {
                    return `request.Headers.Add("${i[0]}", "${i[1]}");`;
                })
                .join("\n");
            let boilerplate = `var client = new HttpClient();
var request = new HttpRequestMessage();
request.RequestUri = new Uri("${url}");
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
var url = Uri.parse('${url}');

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
    url: '${url}',
    headers: headersList,${
        methodString.match(/PUT|POST/) ? "\n\t\tbody: bodyContent," : ""
    }
}

axios(reqOptions).then(function (response) {
    console.log(response.data);
})`;
            setConfig({ mode: "javascript", boilerplate });
        } else if (selectCode === "Javascript Fetch") {
            let boilerplate = `let headersList = ${copyHeaderString}

let bodyContent = JSON.stringify(${copyBodyString});

fetch("${url}", { 
    method: "${methodString}",
    headers: headersList,${
        methodString.match(/PUT|POST/) ? "\n\t\tbody: bodyContent," : ""
    }
}).then(function(response) {
    return response.text();
}).then(function(data) {
    console.log(data);
})`;
            setConfig({ mode: "javascript", boilerplate });
        } else if (selectCode === "Python Http.client") {
            let boilerplate = `import http.client
import json

conn = http.client.HTTPSConnection("${urlArray?.[4] ? urlArray?.[4] : ""}")

headersList = ${copyHeaderString.replaceAll("true", "True")}

payload = json.dumps(${copyBodyString.replaceAll("true", "True")})

conn.request("${methodString}", "${urlArray?.[5] ? urlArray?.[5] : ""}${
                urlArray?.[6] ? urlArray?.[6] : ""
            }", payload, headersList)
response = conn.getresponse()
result = response.read()

print(result.decode("utf-8"))`;
            setConfig({ mode: "python", boilerplate });
        } else if (selectCode === "Python Requests") {
            let boilerplate = `import requests
import json

reqUrl = "${url}"

headersList = ${copyHeaderString.replaceAll("true", "True")}

payload = json.dumps(${copyBodyString.replaceAll("true", "True")})})

response = requests.request("${methodString}", reqUrl, data=payload,  headers=headersList)

print(response.text)`;
            setConfig({ mode: "python", boilerplate });
        } else if (selectCode === "cURL") {
            let headerString = Object.entries(copyHeaders)
                .map(i => {
                    return `\t--header '${i[0]}: ${i[1]}' \\`;
                })
                .join("\n");
            let boilerplate = `curl -X GET \
'${url}' 
    --data-raw '${copyBodyString}'
    --header 'Content-Type: application/json'
${headerString}`;
            setConfig({ mode: "shell", boilerplate });
        } else if (selectCode === "PowerShell") {
            let headerString = Object.entries(copyHeaders)
                .map(i => {
                    return `$headers.Add("${i[0]}", "${i[1]}")`;
                })
                .join("\n");
            let boilerplate = `$headers = @{}
${headerString}
$headers.Add("Content-Type", "application/json")

$reqUrl = '${url}'
$body = '${copyBodyString}'

$response = Invoke-RestMethod -Uri $reqUrl -Method ${
                urlData.method
            } -Headers $headers -ContentType 'application/json' ${
                urlData.method === "Post" || urlData.method === "Put"
                    ? "-Body $body"
                    : ""
            }
$response | ConvertTo-Json`;
            setConfig({ mode: "powershell", boilerplate });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCode, headers, body, urlData, auth, queryParams]);
    const isMobile = useDeviceType();

    return isMobile === "mobile" ? (
        <AceCodeEditor mode={config.mode} readOnly value={config.boilerplate} />
    ) : (
        <MonacoCodeEditor
            value={config.boilerplate}
            readOnly
            language={config.mode}
        />
    );
}
