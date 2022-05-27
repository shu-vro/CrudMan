import styles from "../css/App.module.scss";
import { Nav, Config, Results } from "../components/index";
import Wrapper from "../components/Wrapper";
import Border from "../components/Border";
// import Splitter from "../m-react-splitters/";
import Split from "ts-react-splitter";

function App() {
    return (
        <Wrapper>
            <Nav />
            <div className={styles.container}>
                {/* <Config />
                <Border />
                <Results /> */}
                <Split>
                    <Config />
                    <Results />
                </Split>
            </div>
        </Wrapper>
    );
}

export default App;
