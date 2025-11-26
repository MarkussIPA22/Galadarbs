import { Link, router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { route } from "ziggy-js";
import { useState, useEffect } from "react";

export default function Sidebar({ auth, isOpen, toggleSidebar }) {
    const { i18n } = useTranslation();

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
    );

    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        router.get(route("locale.switch", lang), {}, { preserveState: true });
    };

    const linkClasses =
        "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";

    const findNearbyGyms = async () => {
        if (!navigator.geolocation) {
            alert("Your browser does not support location.");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            try {
                const res = await fetch(
                    `http://127.0.0.1:8000/api/nearby-gyms?lat=${lat}&lng=${lng}`
                );
                const data = await res.json();
                console.log("Gyms API response:", data);

                if (data.results && data.results.length > 0) {
                    setGyms(data.results);
                    const names = data.results
                        .map((gym) => gym.name)
                        .join("\n");
                    alert("Nearby gyms:\n" + names);
                } else {
                    alert("No gyms found nearby.");
                }
            } catch (error) {
                console.error(error);
                alert("Error fetching gyms.");
            }
        });
    };

    return (
        <>
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 p-6 transform transition-transform duration-300 ease-in-out
          ${
              isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:h-auto md:top-auto md:left-auto`}
            >
                <div className="flex items-center gap-2 mb-6">
                    <button
                        onClick={() => switchLanguage("en")}
                        className="relative w-12 h-8 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        <img
                            src="/flags/english_flag.png"
                            alt="EN"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </button>
                    <button
                        onClick={() => switchLanguage("lv")}
                        className="relative w-12 h-8 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        <img
                            src="/flags/latvia_flag.png"
                            alt="LV"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </button>

                    <div className="flex items-center ml-auto md:hidden gap-2">
                        <span className="text-gray-700 dark:text-gray-200 font-medium">
                            {theme === "dark"
                                ? i18n.t("Dark")
                                : i18n.t("Light")}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
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
                        </label>
                    </div>
                </div>

                <nav className="flex flex-col gap-3">
                    <Link href="/dashboard" className={linkClasses}>
                        {i18n.t("Dashboard")}
                    </Link>
                    <Link
                        href={route("workouts.create")}
                        className={linkClasses}
                    >
                        {i18n.t("create_workout")}
                    </Link>
                    <Link href="/my-workouts" className={linkClasses}>
                        {i18n.t("my_workouts")}
                    </Link>
                    <Link href="/profile" className={linkClasses}>
                        {i18n.t("profile")}
                    </Link>
                    <Link href="/max/calculate" className={linkClasses}>
                        {i18n.t("One-Rep Max")}
                    </Link>
                    {auth.user?.is_admin === 1 && (
                        <Link
                            href={route("admin.dashboard")}
                            className={linkClasses}
                        >
                            {i18n.t("admin_panel")}
                        </Link>
                    )}
                    <Link href="/tasks" className={linkClasses}>
                        {i18n.t("tasks")}
                    </Link>
                    <Link href="/users" className={linkClasses}>
                        {i18n.t("users")}
                    </Link>
                    <Link href="/muscles/stats" className={linkClasses}>
                        {i18n.t("Muscle_Stats")}
                    </Link>

                    <button
                        onClick={findNearbyGyms}
                        className={`${linkClasses} bg-green-500 text-white hover:bg-green-600`}
                    >
                        {i18n.t("Find Nearby Gyms")}
                    </button>

                    <Link
                        href={route("logout")}
                        method="post"
                        className={`${linkClasses} hover:bg-red-600`}
                    >
                        {i18n.t("logout")}
                    </Link>
                </nav>
            </aside>

            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                />
            )}
        </>
    );
}
