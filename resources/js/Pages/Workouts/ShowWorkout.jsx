import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react"; // Added for a cleaner icon

function WorkoutHeader({ name, description, exerciseCount, t }) {
    return (
        <div className="flex flex-col gap-3 mb-7">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                    {exerciseCount} {t("exercises") || "exercises"}
                </p>
                <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
                    {name}
                </h1>
                {description && (
                    <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function ShowWorkout({ auth, workout, latest_log }) {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const displayExercises = latest_log?.exercises || workout?.exercises || [];

    return (
        <AuthenticatedLayout auth={auth} header={workout?.name}>
            <Head title={workout?.name || "Workout"} />

            <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 pt-20 p-5 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    <WorkoutHeader
                        name={workout?.name || "Unknown Workout"}
                        description={workout?.description}
                        exerciseCount={displayExercises.length}
                        t={t}
                    />

                    <div className="space-y-6">
                        {displayExercises.length > 0 ? (
                            displayExercises.map((exercise, exIndex) => (
                                <div
                                    key={exercise.id || exIndex}
                                    className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
                                >
                                    <div className="flex items-center gap-3 px-5 py-4 bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center text-black font-black text-sm">
                                            {exIndex + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-zinc-900 dark:text-white">
                                                <Link
                                                    href={route(
                                                        "exercises.show",
                                                        exercise.id,
                                                    )}
                                                    className="hover:text-lime-500 transition-colors"
                                                >
                                                    {currentLang === "lv"
                                                        ? exercise.name_lv ||
                                                          exercise.name
                                                        : exercise.name}
                                                </Link>
                                            </h3>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                                {currentLang === "lv"
                                                    ? exercise.muscle_group_lv ||
                                                      exercise.muscle_group
                                                    : exercise.muscle_group}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Sets Table */}
                                    <div className="p-5">
                                        <div className="grid grid-cols-12 gap-4 mb-3 px-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                            <span className="col-span-2">
                                                {t("set") || "Set"}
                                            </span>
                                            <span className="col-span-5">
                                                KG
                                            </span>
                                            <span className="col-span-5">
                                                {t("reps")}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            {exercise.sets &&
                                            exercise.sets.length > 0 ? (
                                                exercise.sets.map(
                                                    (set, setIndex) => (
                                                        <div
                                                            key={setIndex}
                                                            className="grid grid-cols-12 gap-4 items-center py-3 px-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-transparent dark:hover:border-zinc-700 transition-colors"
                                                        >
                                                            <span className="col-span-2 text-sm font-black text-zinc-400">
                                                                {setIndex + 1}
                                                            </span>
                                                            <span className="col-span-5 text-sm font-bold text-zinc-900 dark:text-white">
                                                                {set.weight}{" "}
                                                                <span className="text-[10px] text-zinc-500 font-normal">
                                                                    kg
                                                                </span>
                                                            </span>
                                                            <span className="col-span-5 text-sm font-bold text-zinc-900 dark:text-white">
                                                                {set.reps}{" "}
                                                                <span className="text-[10px] text-zinc-500 font-normal">
                                                                    {t("reps")}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ),
                                                )
                                            ) : (
                                                <p className="text-sm text-zinc-500 italic py-2">
                                                    {t("no_sets_recorded") ||
                                                        "No sets recorded for this exercise."}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                                <p className="text-zinc-500">
                                    {t("no_exercises_found") ||
                                        "No exercises found in this workout."}
                                </p>
                            </div>
                        )}

                        <div className="pt-6">
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                <ArrowLeft size={16} /> {t("Back to profile")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
