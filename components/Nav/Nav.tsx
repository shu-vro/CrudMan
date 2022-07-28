import styles from "@styles/App.module.scss";
import SideStyles from "@styles/Sidebar.module.scss";
import { useTheme } from "@utils/Theme";
import { useState, useEffect } from "react";
import { LogoSvg } from "./ButtonSvg";
import { FaBars } from "react-icons/fa";
import { BsWindowSidebar, BsMoonStars } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { GoDesktopDownload } from "react-icons/go";

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
            <a href="./" className={styles.__logo_section}>
                <LogoSvg />

                <h1>
                    <span>CRUD</span>
                    <span>MAN</span>
                </h1>
            </a>
            <div className={styles.button_section}>
                <button
                    type="button"
                    data-tip="Install App"
                    onClick={async () => {
                        if (deferredPrompt !== null) {
                            deferredPrompt.prompt();
                            const { outcome } = await deferredPrompt.userChoice;
                            if (outcome === "accepted") {
                                setDeferredPrompt(null);
                            }
                        }
                    }}>
                    {deferredPrompt && <GoDesktopDownload />}
                </button>
                <button
                    type="button"
                    className="theme-button"
                    data-tip={`Toggle theme to ${
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
                        <BsMoonStars />
                    ) : (
                        <FiSun />
                    )}
                </button>
                <button
                    type="button"
                    data-tip="Toggle Layout"
                    className="vanish"
                    onClick={() => {
                        setToggleVertical(prev => !prev);
                        setVertical(prev => (prev.state > 786 ? 785 : 787));
                    }}>
                    <BsWindowSidebar />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        document
                            .querySelector(`.${SideStyles.sidebar}`)
                            .classList.remove("inactive");

                        document.querySelector(
                            `.${SideStyles.overlay}`
                            // @ts-ignore
                        ).style.display = "block";
                    }}>
                    <FaBars />
                </button>
            </div>
        </nav>
    );
}
