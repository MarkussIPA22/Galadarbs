import React from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import WorkoutCard from "@/Components/Workouts/WorkoutCard";
import { useTranslation } from "react-i18next";
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";

export default function MyWorkouts({ auth }) {
    const { t } = useTranslation();
    const { workouts } = usePage().props;

    const handleDelete = (id) => {
        if (confirm(t("confirm_delete"))) {
            router.delete(route("workouts.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors">
                <div className="w-full md:w-64 flex-shrink-0">
                    <ResponsiveSidebar auth={auth} />
                </div>

                <main className="flex-1 p-4 sm:p-6 lg:p-10">
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    {t("Your_Workouts")}
                                </h1>
                            </div>

                            {workouts.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {workouts.length}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {workouts.length === 1
                                                    ? t("workout_number")
                                                    : t(
                                                          "workout_number_plural"
                                                      )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {workouts.length > 0 ? (
                        <div className="space-y-4">
                            {workouts.map((workout, index) => (
                                <div key={workout.id}>
                                    <WorkoutCard
                                        workout={workout}
                                        t={t}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {t("no_workouts_yet")}
                            </h3>

                            <a
                                href={route("workouts.create")}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-900 text-white rounded-xl font-semibold shadow-lg  transition-all duration-200 transform hover:-translate-y-0.5"
                            >
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
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                <span>{t("Create_Your_First_Workout")}</span>
                            </a>
                        </div>
                    )}
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
