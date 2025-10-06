import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from 'react-i18next';

export default function CompletedWorkoutsList({ completedLogs, title, emptyText, deletedText }) {
    const { t } = useTranslation();

    return (
        <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    {title}
                </h2>
                {completedLogs.length > 0 && (
                    <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full font-medium">
                        {completedLogs.length} total
                    </span>
                )}
            </div>

            {completedLogs.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {completedLogs.slice(0, 10).map((log, index) => (
                        <div
                            key={log.id}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-sm"></div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">
                                        {log.workout ? (
                                            <Link
                                                href={route("workouts.start", log.workout.id)}
                                                className="text-emerald-500 hover:underline"
                                            >
                                                {log.workout.name}
                                            </Link>
                                        ) : (
                                            deletedText
                                        )}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {t('Trenina_numurs')}{completedLogs.length - index}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {new Date(log.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {new Date(log.created_at).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {t('No_completed_workouts_yet')}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">{emptyText}</p>
                </div>
            )}
        </div>
    );
}
