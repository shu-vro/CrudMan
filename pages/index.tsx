import styles from "../css/App.module.scss";
import { Nav, Config, Results } from "../components/index";
import Wrapper from "../components/Wrapper";
import Splitter from "../plugins/m-react-splitters";
import { useEffect, useState } from "react";

function App() {
    const [vertical, setVertical] = useState(true);
    // useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         if (window.matchMedia(`(max-width: 786)`).matches) {
    //             setVertical(false);
    //         } else {
    //             setVertical(true);
    //         }
    //     });
    // }, []);

    return (
        <Wrapper>
            <Nav />
            <div className={styles.container}>
                <Splitter
                    position={vertical ? "vertical" : "horizontal"}
                    primaryPaneWidth="50%"
                    primaryPaneMinWidth="30%"
                    primaryPaneMaxWidth="70%"
                    primaryPaneHeight="50%"
                    primaryPaneMinHeight="30%"
                    primaryPaneMaxHeight="70%"
                >
                    <Config />
                    <Results />
                </Splitter>
            </div>
        </Wrapper>
    );
}

export default App;
