import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useTheme } from "@utils/Theme";

export default function Tooltip() {
    const { value: theme } = useTheme();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    return (
        <>
            {ready && (
                <ReactTooltip
                    place="bottom"
                    effect="float"
                    className="zmore"
                    type={theme === "dark" ? "light" : "dark"}
                />
            )}
        </>
    );
}
