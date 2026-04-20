import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function CompletedWorkoutsList({
    completedLogs,
    title,
    emptyText,
    deletedText,
}) {
    const { t } = useTranslation();

    return (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 h-full">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    {title}
                </h2>
                {completedLogs.length > 0 && (
                    <span className="text-xs font-bold text-lime-700 dark:text-lime-400 bg-lime-50 dark:bg-lime-400/10 border border-lime-200 dark:border-lime-400/20 px-2.5 py-1 rounded-full">
                        {completedLogs.length} {t("total")}
                    </span>
                )}
            </div>

            {completedLogs.length > 0 ? (
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {completedLogs.slice(0, 10).map((log, index) => {
                        const date = new Date(log.created_at);
                        const duration = log.duration_minutes
                            ? `${log.duration_minutes}m`
                            : null;

                        return (
                            <div
                                key={log.id}
                                className="group flex items-center gap-4 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 hover:border-zinc-200 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
                            >
                                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
                                    <span className="text-xs font-black text-zinc-500 dark:text-zinc-300">
                                        #{completedLogs.length - index}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white truncate">
                                        {log.workout ? (
                                            <Link
                                                href={route(
                                                    "workouts.start",
                                                    log.workout.id,
                                                )}
                                                className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                                            >
                                                {log.workout.name}
                                            </Link>
                                        ) : (
                                            <span className="text-zinc-400 dark:text-zinc-500 italic">
                                                {deletedText}
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                                        {date.toLocaleDateString(undefined, {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                        {" · "}
                                        {date.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>

                                {/* Right side */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {duration && (
                                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-md">
                                            {duration}
                                        </span>
                                    )}
                                    <div className="w-2 h-2 rounded-full bg-lime-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
                        {t("No_completed_workouts_yet")}
                    </h3>
                </div>
            )}
        </div>
    );
}
