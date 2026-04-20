import React from "react";
import { Link } from "@inertiajs/react";
import MuscleGroupBadge from "@/Components/Muscles/MuscleGroupBadge";

export default function WorkoutCard({ workout, t, onDelete }) {
    return (
        <div className="group relative rounded-2xl bg-gradient-to-br from-white via-white to-zinc-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-6 lg:p-7 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/20 transition-all duration-300 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-lime-300 to-sky-300 dark:from-lime-400 dark:to-sky-400 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-lime-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1 min-w-0 space-y-5">
                    <div>
                        <h3 className="text-xl lg:text-2xl font-black text-zinc-900 dark:text-white mb-2.5 truncate tracking-tight group-hover:text-zinc-800 dark:group-hover:text-zinc-100 transition-colors">
                            {workout.name}
                        </h3>

                        {workout.description && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                                {workout.description}
                            </p>
                        )}
                    </div>

                    {workout.muscle_groups?.length > 0 && (
                        <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1 h-1 bg-lime-500 rounded-full"></div>
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                    {t("muscle_groups")}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {workout.muscle_groups.map((group, i) => (
                                    <MuscleGroupBadge
                                        key={i}
                                        group={group}
                                        t={t}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-row lg:flex-col gap-2.5 lg:w-48 shrink-0">
                    <Link
                        href={route("workouts.start", workout.id)}
                        className="relative flex-1 lg:w-full inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:bg-lime-300 hover:shadow-[0_0_28px_rgba(163,230,53,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden group/start"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-lime-300/0 via-white/40 to-lime-300/0 translate-x-[-100%] group-hover/start:translate-x-[100%] transition-transform duration-700"></div>
                        <svg
                            className="w-4 h-4 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="relative z-10">
                            {t("Start_Workout")}
                        </span>
                    </Link>

                    <Link
                        href={route("workouts.edit", workout.id)}
                        className="relative flex-1 lg:w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group/edit overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/0 via-zinc-200/50 to-zinc-100/0 dark:from-zinc-700/0 dark:via-zinc-600/50 dark:to-zinc-700/0 opacity-0 group-hover/edit:opacity-100 transition-opacity duration-300"></div>
                        <svg
                            className="w-4 h-4 relative z-10 group-hover/edit:rotate-3 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        <span className="relative z-10">{t("edit")}</span>
                    </Link>

                    <button
                        onClick={() => onDelete(workout.id)}
                        className="relative flex-1 lg:w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group/delete overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-100/0 via-red-200/50 to-red-100/0 dark:from-red-900/0 dark:via-red-800/50 dark:to-red-900/0 opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300"></div>
                        <svg
                            className="w-4 h-4 relative z-10 group-hover/delete:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        <span className="relative z-10">{t("delete")}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
