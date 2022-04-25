import "./css/App.scss";
import styles from "./css/App.module.scss";
import { Nav, Config, Results } from "./components/index";
import { ApiDataContext } from "./utils/ApiData";

function App() {
    return (
        <ApiDataContext>
            <div>
                <Nav />
                <div className={styles.container}>
                    <Config />
                    <Results />
                </div>
            </div>
        </ApiDataContext>
    );
}

export default App;
