import styles from "@styles/App.module.scss";
import { Nav, Config, Results, Wrapper, Sidebar } from "../components";
import Splitter from "@plugins/Splitters";
import { useEffect, useState } from "react";
import Tooltip from "components/Tooltip";

function App() {
    const [vertical, setVertical] = useState(787);
    const [toggleVertical, setToggleVertical] = useState(true);

    useEffect(() => {
        setVertical(window.innerWidth);

        window.addEventListener("resize", () => {
            setVertical(window.innerWidth);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Wrapper>
            <Nav
                setVertical={setVertical}
                setToggleVertical={setToggleVertical}
            />
            <Sidebar />
            <Splitter
                position={
                    vertical > 786 && toggleVertical ? "vertical" : "horizontal"
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
            <Tooltip />
        </Wrapper>
    );
}

export default App;
