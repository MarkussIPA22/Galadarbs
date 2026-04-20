import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";

export default function Show({
    auth,
    profileUser,
    workouts,
    completedLogs,
    tasks = [],
}) {
    const { t } = useTranslation();
    const getRecentWorkouts = () => completedLogs.slice(0, 5);

    const totalStreak = tasks.reduce(
        (sum, task) => sum + (task.streak || 0),
        0,
    );

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={`${profileUser.name}'s ${t("Profile")}`} />

            <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 transition-colors duration-300">
                <main className="max-w-5xl mx-auto p-6 lg:p-10">
                    <nav className="flex items-center justify-between mb-8">
                        <Link
                            href={route("users.index")}
                            className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        >
                            ← {t("Back to Users")}
                        </Link>
                    </nav>

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

                        <div className="text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                                <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                                    {profileUser.name}
                                </h1>

                                {auth.user.id !== profileUser.id && (
                                    <Link
                                        href={route(
                                            "chat.with",
                                            profileUser.id,
                                        )}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#bef264] hover:bg-[#a3d942] text-zinc-900 text-xs font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-md"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.138 6.337.408 1.108.145 1.913 1.101 1.913 2.215v6.181c0 1.114-.805 2.07-1.913 2.215-1.314.17-2.654.292-4.013.364L10 21l-3.66-4.964c-1.359-.072-2.699-.193-4.013-.364C1.218 15.527.413 14.571.413 13.457V7.276c0-1.114.805-2.07 1.913-2.215z" />
                                        </svg>
                                        {t("Message")}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:gap-8 mb-12">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 rounded-2xl shadow-sm relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                                    {t("Workouts Created")}
                                </p>
                                <p className="text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                    {workouts?.length || 0}
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5"></div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8 rounded-2xl shadow-sm relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">
                                    {t("Completed_Workouts")}
                                </p>
                                <p className="text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                    {completedLogs?.length || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-zinc-900 dark:bg-zinc-100"></span>
                                {t("All Workouts")}
                            </h3>

                            <div className="space-y-3">
                                {workouts?.length > 0 ? (
                                    workouts.map((workout) =>
                                        workout ? (
                                            <Link
                                                key={workout.id}
                                                href={route(
                                                    "workouts.show",
                                                    workout.id,
                                                )}
                                                className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group shadow-sm"
                                            >
                                                <div className="flex-1 overflow-hidden">
                                                    <h4 className="text-sm font-black text-zinc-800 dark:text-zinc-100 uppercase truncate">
                                                        {workout.name}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ) : null,
                                    )
                                ) : (
                                    <div className="p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
                                        <p className="text-xs text-zinc-500 font-bold uppercase">
                                            {t("No active plans")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Completed */}
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-4 bg-[#bef264]"></span>
                                {t("Completed_Workouts")}
                            </h3>

                            <div className="space-y-3">
                                {completedLogs?.length > 0 ? (
                                    getRecentWorkouts().map((log) =>
                                        log.workout ? (
                                            <Link
                                                key={log.id}
                                                href={route(
                                                    "workouts.show",
                                                    log.workout.id,
                                                )}
                                                className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group shadow-sm"
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
                                                                "lv-LV",
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-md">
                                                    <span className="text-[10px] font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                                                        Done
                                                    </span>
                                                </div>
                                            </Link>
                                        ) : null,
                                    )
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
