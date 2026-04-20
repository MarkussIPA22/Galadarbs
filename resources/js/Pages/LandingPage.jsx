import React from "react";
import LandingNavBar from "@/Components/LandingNavBar";
import {
    Activity,
    Zap,
    BarChart3,
    Plus,
    Trophy,
    ShieldCheck,
    Infinity as InfinityIcon,
    CircleDollarSign,
} from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const LandingPage = ({ auth }) => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-black dark:text-white font-sans selection:bg-lime-400 selection:text-black">
            <Head title={t("Welcome")} />

            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-lime-500/5 dark:bg-lime-500/10 blur-[120px] pointer-events-none" />

            <LandingNavBar auth={auth} />

            <header className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                    {t("Progress")}, <br className="hidden md:block" />
                    <span className="text-lime-500 dark:text-lime-400">
                        {t("Simplified")}
                    </span>{" "}
                    {t("by Liftify.")}
                </h1>

                <p className="text-slate-500 dark:text-zinc-400 text-lg md:text-xl max-w-xl mx-auto font-medium leading-tight mb-10">
                    {t(
                        "The fastest way to log a set ever built. Liftify strips away the noise of traditional apps to provide a high-speed, high-contrast environment for your PRs.",
                    )}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="inline-block text-center bg-slate-900 dark:bg-lime-400 text-white dark:text-black px-10 py-4 rounded-full font-black uppercase italic hover:scale-105 transition-transform shadow-xl dark:shadow-lime-900/20"
                        >
                            {t("Go to Dashboard")}
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                prefetch={["hover"]}
                                className="inline-block text-center bg-slate-900 dark:bg-lime-400 text-white dark:text-black px-10 py-4 rounded-full font-black uppercase italic hover:scale-105 transition-transform shadow-xl dark:shadow-lime-900/20"
                            >
                                {t("Login")}
                            </Link>

                            <Link
                                href={route("register")}
                                prefetch={["hover"]}
                                className="inline-block text-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white px-10 py-4 rounded-full font-black uppercase italic hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                            >
                                {t("Register")}
                            </Link>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
};

export default LandingPage;
