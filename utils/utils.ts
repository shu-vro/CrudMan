import Mustache from "mustache";
import { Environments } from "./Env";

export function stringToRegex(s: string): RegExp {
    var m = [];
    return (m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/))
        ? new RegExp(
              m[2],
              m[3]
                  .split("")
                  .filter((i: number, p: any, s: any[]) => s.indexOf(i) === p)
                  .join("")
          )
        : new RegExp(s);
}
export function getValueFromResponse(o: any[] | object, v: string) {
    return Array.of(o)
        .flat(Infinity)
        .map(el => {
            return el[v] || undefined;
        })
        .filter(el => el);
}

export function checkRegexKeyInResponse(o: any[] | object, r: RegExp) {
    return Array.of(o)
        .flat(Infinity)
        .map(el => {
            return Boolean(Object.keys(el).toString().match(r));
        })
        .filter(el => el)
        .some(el => el);
}

/**
 *
 * @param contentType Content-Type header
 * @returns {Array} file category and type
 */
export function extractFileNameAndTypeFromContentType(
    contentType
): [String, String] {
    if (contentType) {
        const contentTypeParts = contentType.split(";");
        const fileName = contentTypeParts[0].split("/");
        return fileName;
    }
    return ["", ""];
}

export function extractContentType(contentType) {
    if (contentType) {
        const contentTypeParts = contentType.split(";");
        return contentTypeParts[0];
    }
    return "";
}

export function defineTooltip(
    text: String,
    environment: Environments,
    setTooltipText: React.Dispatch<React.SetStateAction<String>>
) {
    let matchedVars = text.match(/<<(\w*)>>/g);

    if (matchedVars) {
        let obj = {
            vars: [],
            join: function () {
                return `${this.envName}.${this.variable} = ${this.value}`;
            },
        };
        matchedVars.forEach(match => {
            let variable = match.replace(/<<|>>/g, "");
            let envName = "";
            environment.defaultObject.forEach(env => {
                env.variables.forEach(v => {
                    if (v.key === variable) {
                        envName = env.name;
                    }
                });
            });
            if (environment.variables[variable]) {
                obj.vars.push({
                    envName,
                    variable,
                    value: environment.variables[variable],
                });
            }
        });
        let rendered = Mustache.render(
            `<pre>Used environment variables:
    <<#vars>>
    &DoubleLongRightArrow; <<&join>>
    <</vars>>
</pre>`,
            obj
        );
        setTooltipText(rendered);
    } else {
        setTooltipText("");
    }
}

export { ApiDataContext } from "./ApiData";
export { ThemeContext } from "./Theme";
export { UrlDataContext } from "./UrlData";
export { ParamContext } from "./Params";
export { HistoryContext } from "./HistorySaver";
export { HeaderContext } from "./Headers";
export { CodeContext } from "./Code";
export { PostBodyContext } from "./Body";
export { AuthContext } from "./Auth";
export { TestContext } from "./Test";
export { EnvironmentContext } from "./Env";
