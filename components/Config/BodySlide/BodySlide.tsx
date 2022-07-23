import { useEffect, useState } from "react";
import { usePostBody } from "@utils/Body";
import { useHistorySaver } from "@utils/HistorySaver";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";
import AceCodeEditor from "components/Editors/AceCodeEditor";
import useDeviceType from "hooks/useDeviceType";
import { useEnvironment } from "@utils/Env";
import ReactTooltip from "react-tooltip";
import { defineTooltip } from "@utils/utils";

export default function BodySlide() {
    const historySaver = useHistorySaver();
    const [annotations, setAnnotations] = useState([]);
    const [valid, setValid] = useState(true);
    const isMobile = useDeviceType();
    let postBody = usePostBody();
    const environment = useEnvironment();
    const [tooltipTextForField, setTooltipTextForField] = useState("");
    const [postBodyCopy, setPostBodyCopy] = useState(
        JSON.stringify(postBody.object, null, 2)
    );

    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

    useEffect(() => {
        setPostBodyCopy(
            JSON.stringify(historySaver.defaultObject.body, null, 2)
        );
        postBody.setObject(historySaver.defaultObject.body);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historySaver.defaultObject]);

    return (
        <div
            className="slide Body"
            data-html={true}
            data-place="top"
            data-tip={tooltipTextForField}>
            <h2>
                Json Content{" "}
                <span className={`dot ${valid ? "" : "red"}`}></span>
            </h2>
            {isMobile === "mobile" ? (
                <AceCodeEditor
                    value={postBodyCopy}
                    annotations={annotations}
                    onChange={(value, event) => {
                        const { row, column } = event.start;
                        defineTooltip(
                            value,
                            environment,
                            setTooltipTextForField
                        );
                        setPostBodyCopy(value);
                        try {
                            let result = JSON.parse(value);
                            setAnnotations([]);
                            postBody.setObject(result);
                            setValid(true);
                        } catch (error) {
                            setAnnotations(prev => {
                                let o = {
                                    row,
                                    column,
                                    type: "error",
                                    text: `Invalid JSON syntax at row: ${
                                        row + 1
                                    } column:${column + 1}`,
                                };
                                let now = prev.filter(
                                    item => item.row !== o.row
                                );
                                return [...now, o];
                            });
                            setValid(false);
                        }
                    }}
                />
            ) : (
                <MonacoCodeEditor
                    value={postBodyCopy}
                    onChange={value => {
                        defineTooltip(
                            value,
                            environment,
                            setTooltipTextForField
                        );
                        setPostBodyCopy(value);
                        try {
                            postBody.setObject(JSON.parse(value));
                        } catch (error) {}
                    }}
                    onValidate={e => {
                        if (e.length > 0) setValid(false);
                        else setValid(true);
                    }}
                />
            )}
        </div>
    );
}
