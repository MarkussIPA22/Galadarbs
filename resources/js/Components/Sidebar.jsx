import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import {
    LayoutDashboard,
    PlusCircle,
    Dumbbell,
    LineChart,
    Calculator,
    CheckSquare,
    Users,
    LogOut,
    Sun,
    Moon,
    MessageCircle,
    UserPen,
    ShieldCheck,
} from "lucide-react";

export default function Sidebar({ auth = {}, isOpen, toggleSidebar }) {
    const { t, i18n } = useTranslation();
    const { url } = usePage();

    const NAV_ITEMS = [
        { key: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { key: "create_workout", href: "/workouts/create", icon: PlusCircle },
        { key: "my_workouts", href: "/my-workouts", icon: Dumbbell },
        {
            key: "Workout Information",
            href: "/muscles/stats",
            icon: LineChart,
            data: { locale: i18n.language },
        },
        {
            key: "One Rep Max Calculator",
            href: "/Max/Calculate",
            icon: Calculator,
        },
        { key: "tasks", href: "/tasks", icon: CheckSquare },
        { key: "users", href: "/users", icon: Users },
        { key: "Chat", href: "/chat", icon: MessageCircle },
        { key: "Profile", href: "/profile", icon: UserPen },
    ];

    if (auth.user && auth.user.is_admin === 1) {
        NAV_ITEMS.push({
            key: "Admin Panel",
            href: "/admin",
            icon: ShieldCheck,
        });
    }

    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "dark";
        }
        return "dark";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <>
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800/50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:sticky md:top-0 md:h-screen`}
            >
                <nav className="flex-1 px-4 pt-12 space-y-1 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const isActive = url === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-lime-400/10 text-lime-600 dark:text-lime-400" : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"}`}
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                <span className="flex-1">{t(item.key)}</span>
                                {isActive && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-lime-500 shadow-[0_0_8px_#84cc16]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto border-t border-zinc-200 dark:border-zinc-800/50">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg gap-1">
                            {[
                                { code: "en", img: "/flags/english_flag.png" },
                                { code: "lv", img: "/flags/latvia_flag.png" },
                            ].map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() =>
                                        i18n.changeLanguage(lang.code)
                                    }
                                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all ${i18n.language === lang.code ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
                                >
                                    <img
                                        src={lang.img}
                                        alt={lang.code}
                                        className="w-3.5 h-2.5 object-cover rounded-[1px] shadow-sm"
                                    />
                                    <span className="text-[10px] font-bold uppercase">
                                        {lang.code}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95"
                            type="button"
                        >
                            {theme === "dark" ? (
                                <Sun size={16} />
                            ) : (
                                <Moon size={16} />
                            )}
                        </button>
                    </div>

                    <div className="p-2 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center gap-3 mb-2">
                            {auth.user?.profile_pic_url ? (
                                <img
                                    src={auth.user.profile_pic_url}
                                    alt={auth.user.name}
                                    className="w-10 h-10 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-lime-400 flex items-center justify-center text-black font-black">
                                    {auth.user?.name?.[0]?.toUpperCase() || "?"}
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate text-zinc-900 dark:text-white">
                                    {auth.user?.name || "Guest"}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex items-center gap-2 w-full px-2 py-1.5 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <LogOut size={14} />
                            {t("Logout")}
                        </Link>
                    </div>
                </div>
            </aside>

            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                />
            )}
        </>
    );
}
