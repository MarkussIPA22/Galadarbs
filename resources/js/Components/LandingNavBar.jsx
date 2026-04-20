import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { route } from "ziggy-js";
import { Sun, Moon } from "lucide-react"; // Import icons

export default function LandingNavbar({ auth }) {
    const { i18n, t } = useTranslation();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    const switchLanguage = async (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        try {
            await axios.get(route("locale.switch", lang));
        } catch (error) {
            console.error("Language sync failed", error);
        }
    };

    return (
        <nav className="top-0 left-0 right-0 z-50  bg-transparent">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="text-2xl font-black text-emerald-500 tracking-tighter">
                    LIFTIFY
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        <button
                            onClick={() => switchLanguage("en")}
                            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                                i18n.language === "en"
                                    ? "bg-white dark:bg-gray-700 shadow-sm text-emerald-500"
                                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            <img
                                src="/flags/english_flag.png"
                                className="w-4 h-2.5 object-cover rounded-sm"
                                alt="EN"
                            />
                            <span className="text-xs font-bold">EN</span>
                        </button>
                        <button
                            onClick={() => switchLanguage("lv")}
                            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                                i18n.language === "lv"
                                    ? "bg-white dark:bg-gray-700 shadow-sm text-emerald-500"
                                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        >
                            <img
                                src="/flags/latvia_flag.png"
                                className="w-4 h-2.5 object-cover rounded-sm"
                                alt="LV"
                            />
                            <span className="text-xs font-bold">LV</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-6">
                        {auth?.user ? (
                            <a
                                href="/dashboard"
                                className="text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-emerald-500 transition-colors"
                            >
                                {t("Dashboard")}
                            </a>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-emerald-500 transition-colors"
                                >
                                    {t("Login")}
                                </a>
                                <a
                                    href="/register"
                                    className="bg-emerald-500 dark:bg-lime-400 text-white dark:text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-600 dark:hover:bg-lime-500 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    {t("Register")}
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
