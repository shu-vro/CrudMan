import styles from "../css/App.module.scss";
import { Nav, Config, Results } from "../components/index";
import Wrapper from "../components/Wrapper";
import Head from "next/head";

function App() {
    return (
        <Wrapper>
            <Head>
                <title>CrudMan</title>
                <link
                    rel="shortcut icon"
                    href="favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Nav />
            <div className={styles.container}>
                <Config />
                <Results />
            </div>
        </Wrapper>
    );
}

export default App;
