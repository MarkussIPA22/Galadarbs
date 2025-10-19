import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";

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
        0
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            header={`${profileUser.name}'s ${t("Profile")}`}
        >
            <Head title={`${profileUser.name}'s ${t("Profile")}`} />

            <div className="flex min-h-screen">
                <ResponsiveSidebar auth={auth} />

                <div className="flex-1 p-6 lg:p-8">
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
                                {profileUser.profile_pic_url ? (
                                    <img
                                        src={profileUser.profile_pic_url}
                                        alt={`${profileUser.name} profile`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl font-bold text-white">
                                        {profileUser.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-3xl lg:text-4xl font-bold text-emerald-500 dark:text-white flex items-center gap-2">
                                    {profileUser.name}{" "}
                                    {totalStreak > 0 && (
                                        <span className="flex items-center gap-1">
                                            <img
                                                src="/streak/fire.png"
                                                alt="Streak"
                                                className="w-8 h-8 animate-pulse"
                                            />
                                            <span className="text-orange-500 font-semibold text-lg">
                                                {totalStreak}
                                            </span>
                                        </span>
                                    )}
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    {t("Profile")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div className="relative bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50">
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                {t("Workouts_Created")}
                            </p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                {workouts?.length || 0}
                            </p>
                        </div>

                        <div className="relative bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50">
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                {t("Completed_Workouts")}
                            </p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                                {completedLogs?.length || 0}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                {t("All_Workouts")}
                            </h2>
                            {workouts?.length > 0 ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {workouts.map((workout) =>
                                        workout ? (
                                            <Link
                                                key={workout.id}
                                                href={route(
                                                    "workouts.show",
                                                    workout.id
                                                )}
                                                className="block p-4 bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:shadow-md hover:scale-[1.02] transition-all duration-200 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-sm"></div>
                                                        <div>
                                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                                {workout.name}
                                                            </h3>
                                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                Workout Plan
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div
                                                key={Math.random()}
                                                className="block p-4 bg-gray-200/50 dark:bg-gray-700/50 rounded-xl border border-gray-300/50 dark:border-gray-600/50"
                                            >
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Deleted Workout
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p>{t("No_Workouts_Yet")}</p>
                            )}
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                {t("Recent_Completed")}
                            </h2>
                            {completedLogs?.length > 0 ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {getRecentWorkouts().map((log) =>
                                        log.workout ? (
                                            <Link
                                                key={log.id}
                                                href={route(
                                                    "workouts.show",
                                                    log.workout.id
                                                )}
                                                className="block p-4 bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-sm"></div>
                                                        <div className="flex-1">
                                                            <span className="font-semibold text-slate-900 dark:text-white">
                                                                {
                                                                    log.workout
                                                                        .name
                                                                }
                                                            </span>
                                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                Completed
                                                                Workout
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                            {new Date(
                                                                log.created_at
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div
                                                key={log.id}
                                                className="block p-4 bg-gray-200/50 dark:bg-gray-700/50 rounded-xl border border-gray-300/50 dark:border-gray-600/50"
                                            >
                                                <div className="flex-1">
                                                    <span className="font-semibold text-gray-500 dark:text-gray-400">
                                                        Deleted Workout
                                                    </span>
                                                    <p className="text-sm text-gray-400 dark:text-gray-500">
                                                        Completed Workout
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p>{t("No_Completed_Yet")}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
