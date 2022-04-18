import "./css/App.scss";
import styles from "./css/App.module.scss";
import request from "./utils";
import { Nav, Config, Results } from "./components/index";
function App() {
    request(
        "https://jsonplaceholder.typicode.com/todos/1",
        "get",
        { hello: "world" },
        { name: "shuvro" }
    ).then((res) => console.log(res));
    return (
        <div>
            <Nav />
            <div className={styles.container}>
                <Config />
                <Results />
            </div>
        </div>
    );
}

export default App;
