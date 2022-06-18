import styles from "@styles/App.module.scss";
import { Nav, Config, Results, Wrapper, Sidebar } from "../components";
import Splitter from "../plugins/Splitters";
import { useEffect, useState } from "react";

function App() {
    const [vertical, setVertical] = useState(true);
    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.matchMedia(`(max-width: 786px)`).matches) {
                setVertical(false);
            } else {
                setVertical(true);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Wrapper>
            <Nav />
            <Sidebar />
            <Splitter
                position={vertical ? "vertical" : "horizontal"}
                primaryPaneWidth="50%"
                primaryPaneMinWidth="30%"
                primaryPaneMaxWidth="70%"
                primaryPaneHeight="50%"
                primaryPaneMinHeight="0%"
                primaryPaneMaxHeight="100%"
                className={styles.container}
            >
                <Config />
                <Results />
            </Splitter>
        </Wrapper>
    );
}

export default App;
