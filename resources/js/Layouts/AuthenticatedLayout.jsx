import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const { t } = useTranslation();

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className={theme === "dark" ? "dark" : ""}>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <div className="p-4 flex justify-end">
                    <label
                        htmlFor="dark-mode-toggle"
                        className="flex items-center cursor-pointer"
                    >
                        <div className="relative">
                            <input
                                id="dark-mode-toggle"
                                type="checkbox"
                                className="sr-only"
                                checked={theme === "dark"}
                                onChange={() =>
                                    setTheme(
                                        theme === "dark" ? "light" : "dark"
                                    )
                                }
                            />
                            <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner transition-colors"></div>
                            <div
                                className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 top-0 transition-transform ${
                                    theme === "dark"
                                        ? "translate-x-full bg-indigo-500"
                                        : ""
                                }`}
                            ></div>
                        </div>
                        <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
                            {theme === "dark" ? t("Dark") : t("Light")}
                        </span>
                    </label>
                </div>

                <main>{children}</main>
            </div>
        </div>
    );
}
