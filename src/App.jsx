import "./css/App.scss";
import styles from "./css/App.module.scss";
import { Nav, Config, Results } from "./components/index";
import { test } from "./utils/utils";
function App() {
    test(
        "https://jsonplaceholder.typicode.com/posts/1",
        "post",
        {},
        { foo: "bar", hello: "world" }
    ).then((res) => {
        console.log(res);
    });
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
