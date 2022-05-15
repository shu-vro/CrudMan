import styles from "../css/App.module.scss";
import { Nav, Config, Results } from "../components/index";
import Wrapper from "../components/Wrapper";

function App() {
    return (
        <Wrapper>
            <Nav />
            <div className={styles.container}>
                <Config />
                <Results />
            </div>
        </Wrapper>
    );
}

export default App;
