import "../css/globals.scss";
import "../css/splitters.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    let myAppLocation = "http://localhost:3000";
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="application-name" content="CrudMan" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="CrudMan" />
                <meta
                    name="description"
                    content="CrudMan - An Online Version Of PostMan For Building And Testing RESTful API"
                />
                <meta
                    name="keywords"
                    content="crudman, restful, api, make-api, test-api"
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#2B5797" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#151619" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="theme-color" content="#151619" />

                <link rel="apple-touch-icon" href="/icons/icon-72x72.png" />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/icons/icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/icons/icon-192x192.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="167x167"
                    href="/icons/icon-152x152.png"
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/icon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/icon-16x16.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="mask-icon"
                    href="/icons/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content={myAppLocation} />
                <meta name="twitter:title" content="CrudMan" />
                <meta
                    name="twitter:description"
                    content="CrudMan - An Online Version Of PostMan For Building And Testing RESTful API"
                />
                <meta
                    name="twitter:image"
                    content={`${myAppLocation}/icons/icon-192x192.png`}
                />
                <meta name="twitter:creator" content="@DavidWShadow" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="CrudMan" />
                <meta
                    property="og:description"
                    content="CrudMan - An Online Version Of PostMan For Building And Testing RESTful API"
                />
                <meta property="og:site_name" content="CrudMan" />
                <meta property="og:url" content={myAppLocation} />
                <meta
                    property="og:image"
                    content={`${myAppLocation}/icons/icon-192x192.png`}
                />
                <title>
                    CrudMan - An Online Version Building And Testing For RESTful
                    API
                </title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
