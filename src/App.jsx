import "./css/App.scss";
import styles from "./css/App.module.scss";
import { Nav, Config, Results } from "./components/index";
import Wrapper from "./components/Wrapper";

function App() {
    return (
        <Wrapper>
            <div>
                <Nav />
                <div className={styles.container}>
                    <Config />
                    <Results />
                </div>
            </div>
        </Wrapper>
    );
}

export default App;
