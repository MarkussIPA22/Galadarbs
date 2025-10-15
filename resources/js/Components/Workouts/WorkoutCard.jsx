import React from "react";
import { Link } from "@inertiajs/react";
import MuscleGroupBadge from "@/Components/Muscles/MuscleGroupBadge";

export default function WorkoutCard({ workout, t, onDelete }) {
    return (
        <div className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-bl-full"></div>

            <div className="relative p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="flex-1 min-w-0 space-y-6">
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                {workout.name}
                            </h3>

                            {workout.description && (
                                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                                    {workout.description}
                                </p>
                            )}
                        </div>

                        {workout.muscle_groups?.length > 0 && (
                            <div className="flex flex-col gap-3 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    <span>{t("muscle_groups")}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {workout.muscle_groups.map((group, i) => (
                                        <MuscleGroupBadge
                                            key={i}
                                            group={group}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-52 shrink-0">
                        <Link
                            href={route("workouts.start", workout.id)}
                            className="relative w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-2xl font-bold text-center shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group/btn"
                        >
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative flex items-center justify-center gap-2">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                {t("Start_Workout")}
                            </span>
                        </Link>

                        <Link
                            href={route("workouts.edit", workout.id)}
                            className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-2xl font-semibold text-center shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                {t("edit")}
                            </span>
                        </Link>

                        <button
                            onClick={() => onDelete(workout.id)}
                            className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 rounded-2xl font-semibold text-center shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                                {t("delete")}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
