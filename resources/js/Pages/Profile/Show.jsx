import React, { useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";

export default function Show({
    auth,
    profileUser,
    workouts = [],
    completedLogs = [],
    tasks = [],
}) {
    const { t, i18n } = useTranslation();

    // Memoize stats to avoid recalculating on every re-render
    const totalStreak = useMemo(
        () => tasks.reduce((sum, task) => sum + (task.streak || 0), 0),
        [tasks],
    );

    const recentLogs = useMemo(
        () => completedLogs.filter((log) => log?.workout).slice(0, 5),
        [completedLogs],
    );

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={`${profileUser.name}'s ${t("Profile")}`} />

            <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 transition-colors duration-300 pb-20">
                <main className="max-w-5xl mx-auto p-6 lg:p-10">
                    {/* Top Navigation */}
                    <nav className="flex items-center justify-between mb-8">
                        <Link
                            href={route("users.index")}
                            className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            ← {t("Back to Users")}
                        </Link>
                    </nav>

                    {/* Profile Header Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                        <div className="relative">
                            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-900 border-2 border-white dark:border-zinc-800 flex items-center justify-center shadow-2xl">
                                {profileUser.profile_pic_url ? (
                                    <img
                                        src={profileUser.profile_pic_url}
                                        alt={profileUser.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-3xl font-black text-white dark:text-zinc-900">
                                        {profileUser.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {totalStreak > 0 && (
                                <div className="absolute -top-2 -right-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                                    <span className="text-orange-500 text-sm">
                                        🔥
                                    </span>
                                    <span className="text-xs font-black text-zinc-900 dark:text-white">
                                        {totalStreak}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
                                <h1 className="text-4xl lg:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                                    {profileUser.name}
                                </h1>

                                {auth.user.id !== profileUser.id && (
                                    <Link
                                        href={route(
                                            "chat.with",
                                            profileUser.id,
                                        )}
                                        className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#bef264] hover:bg-[#a3d942] text-zinc-900 text-[10px] font-black uppercase tracking-[0.15em] rounded-2xl transition-all active:scale-95 shadow-xl shadow-lime-500/10 group"
                                    >
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover:-rotate-12"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.138 6.337.408 1.108.145 1.913 1.101 1.913 2.215v6.181c0 1.114-.805 2.07-1.913 2.215-1.314.17-2.654.292-4.013.364L10 21l-3.66-4.964c-1.359-.072-2.699-.193-4.013-.364C1.218 15.527.413 14.571.413 13.457V7.276c0-1.114.805-2.07 1.913-2.215z" />
                                        </svg>
                                        {t("Message")}
                                    </Link>
                                )}
                            </div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                {profileUser.email}
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 lg:gap-8 mb-12">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 rounded-3xl shadow-sm">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">
                                {t("Workouts Created")}
                            </p>
                            <p className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                {workouts.length}
                            </p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 rounded-3xl shadow-sm">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">
                                {t("Completed_Workouts")}
                            </p>
                            <p className="text-5xl lg:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                {completedLogs.length}
                            </p>
                        </div>
                    </div>

                    {/* Content Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Workouts List */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-zinc-900 dark:bg-zinc-100"></span>
                                {t("All Workouts")}
                            </h3>

                            <div className="space-y-3">
                                {workouts.length > 0 ? (
                                    workouts.filter(Boolean).map((workout) => (
                                        <Link
                                            key={workout.id}
                                            href={route(
                                                "workouts.show",
                                                workout.id,
                                            )}
                                            className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group shadow-sm"
                                        >
                                            <div className="flex-1 overflow-hidden">
                                                <h4 className="text-sm font-black text-zinc-800 dark:text-zinc-100 uppercase truncate">
                                                    {workout.name}
                                                </h4>
                                            </div>
                                            <svg
                                                className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
                                        <p className="text-xs text-zinc-500 font-bold uppercase">
                                            {t("No workouts created")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Logs List */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-[#bef264]"></span>
                                {t("Completed_Workouts")}
                            </h3>

                            <div className="space-y-3">
                                {recentLogs.length > 0 ? (
                                    recentLogs.map((log) => (
                                        <Link
                                            key={log.id}
                                            href={route(
                                                "workouts.show",
                                                log.workout.id,
                                            )}
                                            className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group shadow-sm"
                                        >
                                            <div className="flex items-center gap-4 overflow-hidden">
                                                <div className="w-2 h-2 rounded-full bg-[#bef264] animate-pulse"></div>
                                                <div className="overflow-hidden">
                                                    <span className="text-sm font-black text-zinc-800 dark:text-zinc-100 uppercase truncate block">
                                                        {log.workout.name}
                                                    </span>
                                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                                                        {new Date(
                                                            log.created_at,
                                                        ).toLocaleDateString(
                                                            i18n.language ===
                                                                "lv"
                                                                ? "lv-LV"
                                                                : "en-GB",
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-md"></div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
                                        <p className="text-xs text-zinc-500 font-bold uppercase">
                                            {t("No workouts completed")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
