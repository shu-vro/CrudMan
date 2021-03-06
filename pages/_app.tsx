import "@styles/globals.scss";
import "@styles/splitters.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    let myAppLocation = "http://localhost:3000";
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta httpEquiv="Cache-Control" content="max-age=200" />
                <meta name="application-name" content="CrudMan" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="CrudMan" />
                <meta
                    name="description"
                    content="CrudMan - An Online Ecosystem For Building And Testing RESTful API"
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
                    content="width=device-width, initial-scale=1.0 minimum-scale=1"
                />
                <meta name="theme-color" content="#151619" />

                <link rel="apple-touch-icon" href="/icons/icon_x72.png" />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/icons/icon_x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="192x192"
                    href="/icons/icon_x192.png"
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/icons/icon_x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/icons/icon_x16.png"
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
                    content="CrudMan - An Online Ecosystem For Building And Testing RESTful API"
                />
                <meta
                    name="twitter:image"
                    content={`${myAppLocation}/icons/icon_x192.png`}
                />
                <meta name="twitter:creator" content="@DavidWShadow" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="CrudMan" />
                <meta
                    property="og:description"
                    content="CrudMan - An Online Ecosystem For Building And Testing RESTful API"
                />
                <meta property="og:site_name" content="CrudMan" />
                <meta property="og:url" content={myAppLocation} />
                <meta
                    property="og:image"
                    content={`${myAppLocation}/icons/icon_x192.png`}
                />
                <title>
                    CrudMan - An Online Ecosystem For Building And Testing
                    RESTful API
                </title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
