import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { route } from "ziggy-js";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingNavbar({ auth }) {
    const { i18n, t } = useTranslation();
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
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
        <nav className="sticky top-0 left-0 right-0 z-50 bg-slate-50 dark:bg-transparent ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                <div className="text-2xl font-black text-emerald-500 tracking-tighter">
                    LIFTIFY
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        {["en", "lv"].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => switchLanguage(lang)}
                                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                                    i18n.language === lang
                                        ? "bg-white dark:bg-gray-700 shadow-sm text-emerald-500"
                                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                            >
                                <img
                                    src={`/flags/${lang === "en" ? "english" : "latvia"}_flag.png`}
                                    className="w-4 h-2.5 object-cover rounded-sm"
                                    alt={lang.toUpperCase()}
                                />
                                <span className="text-xs font-bold uppercase">
                                    {lang}
                                </span>
                            </button>
                        ))}
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
                                    className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    {t("Register")}
                                </a>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-gray-600 dark:text-gray-300"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden"
                    >
                        <div className="p-6 space-y-6">
                            <div className="flex justify-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                                {["en", "lv"].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => switchLanguage(lang)}
                                        className={`flex-1 flex justify-center items-center gap-2 py-3 rounded-lg font-bold ${
                                            i18n.language === lang
                                                ? "bg-white dark:bg-gray-700 text-emerald-500 shadow-sm"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        <img
                                            src={`/flags/${lang === "en" ? "english" : "latvia"}_flag.png`}
                                            className="w-5 h-3"
                                            alt={lang}
                                        />
                                        {lang.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                {auth?.user ? (
                                    <a
                                        href="/dashboard"
                                        className="w-full py-4 text-center font-bold text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 rounded-xl"
                                    >
                                        {t("Dashboard")}
                                    </a>
                                ) : (
                                    <>
                                        <a
                                            href="/login"
                                            className="w-full py-4 text-center font-bold text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-xl"
                                        >
                                            {t("Login")}
                                        </a>
                                        <a
                                            href="/register"
                                            className="w-full py-4 text-center font-bold text-white bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20"
                                        >
                                            {t("Register")}
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
