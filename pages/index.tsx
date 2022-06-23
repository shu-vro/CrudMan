import styles from "@styles/App.module.scss";
import { Nav, Config, Results, Wrapper, Sidebar } from "../components";
import Splitter from "../plugins/Splitters";
import { useEffect, useState } from "react";

function App() {
    const [vertical, setVertical] = useState({
        state: true,
        sizeX: 787,
    });
    useEffect(() => {
        setVertical({
            state: true,
            sizeX: window.innerWidth,
        });
        function handleEvent() {
            if (window.matchMedia(`(max-width: 786px)`).matches) {
                setVertical({
                    state: false,
                    sizeX: window.innerWidth,
                });
            } else {
                setVertical({
                    state: true,
                    sizeX: window.innerWidth,
                });
            }
        }
        window.addEventListener("resize", handleEvent);
        return window.removeEventListener("resize", handleEvent);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Wrapper>
            <Nav />
            <Sidebar />
            <Splitter
                position={
                    vertical.state && vertical.sizeX > 786
                        ? "vertical"
                        : "horizontal"
                }
                primaryPaneWidth="50%"
                primaryPaneMinWidth="30%"
                primaryPaneMaxWidth="70%"
                primaryPaneHeight="50%"
                primaryPaneMinHeight="0%"
                primaryPaneMaxHeight="100%"
                className={styles.container}>
                <Config />
                <Results />
            </Splitter>
        </Wrapper>
    );
}

export default App;
