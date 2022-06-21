import styles from "@styles/App.module.scss";
import { useTheme } from "@utils/Theme";
import { useState, useEffect } from "react";

export default function Nav() {
    let themeManager = useTheme();
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", e => {
            setDeferredPrompt(e);
        });
    }, []);

    return (
        <nav className={styles.nav}>
            <div className="logo-section">
                <LogoButton />

                <h1>
                    <span>CRUD</span>
                    <span>MAN</span>
                </h1>
            </div>
            <div className="button-section">
                <button
                    type="button"
                    onClick={async () => {
                        if (deferredPrompt !== null) {
                            deferredPrompt.prompt();
                            const { outcome } = await deferredPrompt.userChoice;
                            if (outcome === "accepted") {
                                setDeferredPrompt(null);
                            }
                        }
                    }}>
                    <InstallButton />
                </button>
                <button
                    type="button"
                    className="theme-button"
                    title={`Toggle theme to ${
                        themeManager.value === "light" ? "Dark" : "Light"
                    }`}
                    onClick={() => {
                        if (!localStorage.getItem("theme")) {
                            localStorage.setItem(
                                "theme",
                                !window.matchMedia(
                                    "(prefers-color-scheme: dark)"
                                ).matches
                                    ? "light"
                                    : "dark"
                            );
                        } else {
                            let theme = localStorage.getItem("theme");
                            theme === "dark"
                                ? localStorage.setItem("theme", "light")
                                : localStorage.setItem("theme", "dark");
                            themeManager.setValue(
                                localStorage.getItem("theme")
                            );
                        }
                    }}>
                    {themeManager.value === "light" ? (
                        <MoonButton />
                    ) : (
                        <SunButton />
                    )}
                </button>
                <button
                    type="button"
                    className="nav-button"
                    onClick={() => {
                        document
                            .querySelector(`.${styles.sidebar}`)
                            .classList.remove("inactive");
                    }}>
                    &equiv;
                </button>
            </div>
        </nav>
    );
}

function LogoButton(rest: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            id="e2ALfJdSy7v1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            width="512"
            height="512"
            {...rest}>
            <path
                d="M54.999602,1.880388L456.999861,0q53.630787,1.880388,53.630787,56.879989q0,34.355429,0,393.636192Q510.630648,512,456.999861,512q-8.393102,0-412.564452,1.880388Q-0.00051,503.920834,0.000139,457q0-46.194972,44.43527-55.999999h265.683816q40.754822-.115995,44-45t-44.000088-44.884006L158.244392,311q-55.00011-2.121744-55.00011-53.119612t55.00011-56.880386l151.874833-.115997q41.836547-.277112,44-37.931344c2.163453-37.654232-12.503243-48.13152-44.000088-49.952661h-265.683728Q0.000139,99.962557,-0.00051,58.760377Q0.000139,13.693501,54.999602,1.880388Z"
                transform="translate(.000002 0)"
                fill="#3096ff"
                strokeWidth="1.024"
            />
        </svg>
    );
}

function InstallButton(rest: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nav-button"
            fill="var(--general-text-color)"
            width={25}
            {...rest}
            viewBox="0 0 512 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
            <path d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z" />
        </svg>
    );
}
function MoonButton(rest: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nav-button"
            fill="var(--general-text-color)"
            width={25}
            {...rest}
            viewBox="0 0 512 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
            <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
        </svg>
    );
}

function SunButton(rest: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nav-button"
            fill="var(--general-text-color)"
            width={25}
            {...rest}
            viewBox="0 0 512 512">
            {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
            <path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z" />
        </svg>
    );
}
