import React from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import WorkoutCard from "@/Components/Workouts/WorkoutCard";
import { useTranslation } from "react-i18next";

export default function MyWorkouts({ auth }) {
    const { t } = useTranslation();
    const { workouts } = usePage().props;

    const handleDelete = (id) => {
        if (confirm(t("confirm_delete"))) {
            router.delete(route("workouts.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="flex flex-col md:flex-row min-h-screen bg-zinc-100 dark:bg-zinc-950 transition-colors duration-200">
                <main className="flex-1 p-5 lg:p-8 overflow-hidden">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
                                    {t("Your_Workouts")}
                                </h1>
                            </div>

                            {workouts.length > 0 && (
                                <div className="relative self-start sm:self-auto">
                                    <div className="absolute inset-0 bg-lime-300 dark:bg-lime-400 blur-xl opacity-20 rounded-full"></div>
                                    <span className="relative text-xs font-bold text-lime-700 dark:text-lime-400 bg-lime-50 dark:bg-lime-400/10 border border-lime-200 dark:border-lime-400/20 px-3.5 py-2 rounded-full inline-flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse"></span>
                                        {workouts.length}{" "}
                                        {workouts.length === 1
                                            ? t("workout_number")
                                            : t("workout_number_plural")}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {workouts.length > 0 ? (
                        <div className="space-y-4">
                            {workouts.map((workout, index) => (
                                <div
                                    key={workout.id}
                                    className="animate-fadeIn"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animationFillMode: "backwards",
                                    }}
                                >
                                    <WorkoutCard
                                        workout={workout}
                                        t={t}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="relative rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-lime-300 dark:bg-lime-400 rounded-full blur-3xl opacity-10"></div>
                            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-300 dark:bg-sky-400 rounded-full blur-3xl opacity-10"></div>

                            <div className="relative flex flex-col items-center justify-center py-16 text-center">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-lime-300 dark:bg-lime-400 blur-2xl opacity-20 rounded-full"></div>
                                </div>
                                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2 tracking-tight">
                                    {t("no_workouts_yet")}
                                </h3>

                                <a
                                    href={route("workouts.create")}
                                    className="group relative inline-flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:bg-lime-300 hover:shadow-[0_0_28px_rgba(163,230,53,0.45)] transition-all duration-200 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-lime-300/0 via-white/30 to-lime-300/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
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
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    <span className="relative z-10">
                                        {t("Create_Your_First_Workout")}
                                    </span>
                                </a>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
