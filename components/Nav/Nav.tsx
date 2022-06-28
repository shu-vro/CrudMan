import styles from "@styles/App.module.scss";
import { useTheme } from "@utils/Theme";
import { useState, useEffect } from "react";
import {
    BarSvg,
    InstallSvg,
    LogoSvg,
    MoonSvg,
    OrientationSvg,
    SunSvg,
} from "./ButtonSvg";

export default function Nav({ setVertical, setToggleVertical }) {
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
                <LogoSvg />

                <h1>
                    <span>CRUD</span>
                    <span>MAN</span>
                </h1>
            </div>
            <div className={styles.button_section}>
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
                    <InstallSvg />
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
                    {themeManager.value === "light" ? <MoonSvg /> : <SunSvg />}
                </button>
                <button
                    type="button"
                    title="Toggle Layout"
                    className="vanish"
                    onClick={() => {
                        setToggleVertical(prev => !prev);
                        setVertical(prev => (prev.state > 786 ? 785 : 787));
                    }}>
                    <OrientationSvg />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        document
                            .querySelector(`.${styles.sidebar}`)
                            .classList.remove("inactive");
                    }}>
                    <BarSvg />
                </button>
            </div>
        </nav>
    );
}
