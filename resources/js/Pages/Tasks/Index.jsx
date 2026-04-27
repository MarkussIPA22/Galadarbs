import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import { RefreshCw, Target, Activity } from "lucide-react";
import axios from "axios";
import { Head } from "@inertiajs/react";

export default function Tasks({ task: initialTask, auth }) {
    const { t, i18n } = useTranslation();
    const [task, setTask] = useState(initialTask);
    const [loading, setLoading] = useState(false);

    if (!task) return null;

    // Localized Exercise Name
    const exerciseName =
        i18n.language === "lv"
            ? task.exercise?.name_lv || task.exercise?.name
            : task.exercise?.name;

    // Localized Muscle Group
    const muscleGroupName =
        i18n.language === "lv"
            ? task.exercise?.muscle_group_lv || task.exercise?.muscle_group
            : task.exercise?.muscle_group;

    const progressPercentage = Math.min(
        (task.progress / task.target) * 100,
        100,
    );

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t("Tasks")} />

            <div className="pt-20 pb-10 p-4 sm:p-8 md:p-12 max-w-6xl mx-auto min-h-screen">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                            {t("Your weekly challenge")}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                    <div className="lg:col-span-7 w-full">
                        <div className="aspect-square sm:aspect-video rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900 shadow-sm relative group">
                            {task.exercise?.image_path ? (
                                <img
                                    src={task.exercise.image_path}
                                    className="w-full h-full object-contain p-6 mix-blend-multiply dark:mix-blend-lighten transition-transform duration-500 group-hover:scale-105"
                                    alt={exerciseName}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                    <Activity size={48} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col">
                        <div className="mb-6 lg:mb-8 text-center lg:text-left">
                            {task.completed && (
                                <span className="inline-block px-2 py-0.5 text-[10px] font-black bg-lime-400 text-black uppercase rounded mb-3 animate-bounce">
                                    {t("Completed")}
                                </span>
                            )}

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white leading-tight">
                                {exerciseName}
                            </h2>

                            <span className="inline-flex mt-6 items-center px-3 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 mb-3 border border-zinc-200 dark:border-zinc-700 shadow-inner">
                                {muscleGroupName}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:gap-4">
                            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                                        <Target
                                            size={18}
                                            className="text-zinc-400"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-500">
                                        {t("Target Weight")}
                                    </span>
                                </div>
                                <span className="text-xl font-black tabular-nums text-black dark:text-white">
                                    {task.target}
                                    <small className="text-[10px] ml-1 text-zinc-400 uppercase tracking-widest">
                                        kg
                                    </small>
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                                        <Activity
                                            size={18}
                                            className="text-zinc-400"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-500">
                                        {t("Current Progress")}
                                    </span>
                                </div>
                                <span className="text-xl font-black tabular-nums text-black dark:text-white">
                                    {task.progress}
                                    <small className="text-[10px] ml-1 text-zinc-400 uppercase tracking-widest">
                                        kg
                                    </small>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
