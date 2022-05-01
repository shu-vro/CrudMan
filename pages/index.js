import styles from "../css/App.module.scss";
import { Nav, Config, Results } from "../components/index";
import Wrapper from "../components/Wrapper";
import Head from "next/head";

function App() {
    return (
        <Wrapper>
            <Head>
                <title>CrudMan</title>
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
