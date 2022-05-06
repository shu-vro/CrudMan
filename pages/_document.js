import { Html, Head, Main, NextScript } from "next/document";
import { useTheme } from "../utils/Theme";

export default function Document() {
    const themeManager = useTheme();
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
