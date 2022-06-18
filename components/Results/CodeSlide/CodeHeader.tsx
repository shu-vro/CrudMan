// import {  } from "react";
import { useCode } from "@utils/Code";

export default function CodeHeader() {
    const code = useCode();
    const setObject = code.setObject;
    return (
        <div className="code-header">
            Code{" "}
            <select
                name="select-output-code"
                id="select-output-code"
                onChange={e => {
                    setObject(prev => ({
                        ...prev,
                        selectCode: e.target.value,
                    }));
                }}>
                <option value="C# HttpClient">C# HttpClient</option>
                <option value="cURL">cURL</option>
                <option value="PowerShell">PowerShell</option>
                <option value="Dart Http">Dart Http</option>
                <option value="Javascript Axios">Javascript Axios</option>
                <option value="Javascript Fetch">Javascript Fetch</option>
                <option value="Python Http.client">Python Http.client</option>
                <option value="Python Requests">Python Requests</option>
            </select>
            <button
                type="button"
                onClick={async e => {
                    try {
                        await navigator.clipboard.writeText(code.code);

                        (e.target as HTMLButtonElement).textContent = "Copied!";
                        setTimeout(() => {
                            (e.target as HTMLButtonElement).textContent =
                                "Copy";
                        }, 2000);
                    } catch (error) {
                        alert(
                            `Your device is not compatible to copy code. \nThis error may occur if you are using this website without "https" protocol or with an insecure device.\n\nError Message: ${error.message}`
                        );
                    }
                }}>
                Copy
            </button>
        </div>
    );
}
