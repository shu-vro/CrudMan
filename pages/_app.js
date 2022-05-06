import "../css/index.css";
import "../css/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                />
                <meta
                    name="description"
                    content="CrudMan - an online version of PostMan"
                />
                <meta name="keywords" content="crudman, postman, api" />
                <title>CrudMan</title>

                <link rel="manifest" href="/manifest.json" />
                <link
                    href="/icons/icon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                />
                <link
                    href="/icons/icon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                />
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <meta name="theme-color" content="#151619" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
