import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Home, TriangleAlert, MoveLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Error({ status = 404 }) {
    const { t } = useTranslation();

    const title =
        {
            404: t("Page Not Found"),
            403: t("Access Denied"),
            500: t("Server Error"),
            503: t("Service Unavailable"),
        }[status] || t("Error");

    const description =
        {
            404: t("The page you're looking for doesn't exist"),
            403: t(
                "You don't have the required permissions to view this page.",
            ),
            500: t(
                "Something went wrong on our end. We're working on fixing the issue.",
            ),
            503: t(
                "The app is currently undergoing maintenance. Please try again later.",
            ),
        }[status] || t("An unexpected error occurred.");

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-6">
            <Head title={title} />

            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 animate-pulse">
                    <TriangleAlert size={42} className="text-lime-500" />
                </div>

                <h1 className="text-8xl font-black text-zinc-900 dark:text-white mb-2 italic tracking-tighter">
                    {status}
                </h1>

                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-[0.2em] mb-4">
                    {title}
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                    {description}
                </p>

                <Link
                    href="/dashboard"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-xl shadow-zinc-500/10"
                >
                    <MoveLeft
                        size={16}
                        className="transition-transform group-hover:-translate-x-1"
                    />
                    {t("Back to Dashboard")}
                </Link>
            </div>
        </div>
    );
}
