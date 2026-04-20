import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";

export default function ExerciseShow({
    auth,
    exercise,
    relatedExercises = [],
    isFavorite = false,
}) {
    const { t, i18n } = useTranslation();
    const isLv = i18n.language === "lv";

    const name = isLv && exercise.name_lv ? exercise.name_lv : exercise.name;
    const description =
        isLv && exercise.description_lv
            ? exercise.description_lv
            : exercise.description;
    const muscleGroup =
        isLv && exercise.muscle_group_lv
            ? exercise.muscle_group_lv
            : exercise.muscle_group;
    const secondaryMuscles =
        isLv &&
        Array.isArray(exercise.secondary_muscles_lv) &&
        exercise.secondary_muscles_lv.length > 0
            ? exercise.secondary_muscles_lv
            : Array.isArray(exercise.secondary_muscles)
              ? exercise.secondary_muscles
              : [];

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={name} />

            <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f9fa] dark:bg-zinc-950">
                <main className="flex-1 p-4 lg:p-10 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        <nav className="flex items-center justify-between mb-6">
                            <Link
                                href={route("workouts.create")}
                                className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                            >
                                ← {t("BACK")}
                            </Link>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() =>
                                        router.post(
                                            route(
                                                "exercises.favorite",
                                                exercise.id,
                                            ),
                                        )
                                    }
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md border text-xs font-bold transition-all ${
                                        isFavorite
                                            ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/20"
                                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"
                                    }`}
                                >
                                    <svg
                                        className={`w-4 h-4 ${isFavorite ? "fill-current" : "fill-none"}`}
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {isFavorite ? t("Saved") : t("Save")}
                                </button>
                            </div>
                        </nav>

                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm mb-8">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-[400px] bg-zinc-100 dark:bg-zinc-800 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-700">
                                    <div className="aspect-square relative">
                                        {exercise.video_url ? (
                                            <iframe
                                                src={exercise.video_url}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <img
                                                src={exercise.image_path}
                                                alt={name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-tight">
                                                {muscleGroup}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white uppercase leading-tight mb-6">
                                            {name}
                                        </h1>

                                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                                            <div>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                                                    {t("Primary Muscle")}
                                                </p>
                                                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                                                    {muscleGroup}
                                                </p>
                                            </div>

                                            <div className="col-span-2">
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                                                    {t("Secondary Focus")}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {secondaryMuscles.length >
                                                    0 ? (
                                                        secondaryMuscles.map(
                                                            (m, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="text-[11px] font-bold border border-zinc-200 dark:border-zinc-700 px-2 py-1 rounded bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                                                >
                                                                    {m}
                                                                </span>
                                                            ),
                                                        )
                                                    ) : (
                                                        <span className="text-xs text-zinc-500 italic">
                                                            {t("None listed")}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 flex items-center gap-2">
                                        <span className="w-1 h-3 bg-zinc-900 dark:bg-zinc-100"></span>
                                        {t("Technical Instructions")}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm lg:text-base font-medium whitespace-pre-line">
                                        {description}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">
                                    {t("Similar Variations")}
                                </h3>
                                {relatedExercises.slice(0, 3).map((related) => {
                                    const relatedName =
                                        isLv && related.name_lv
                                            ? related.name_lv
                                            : related.name;
                                    const relatedMuscle =
                                        isLv && related.muscle_group_lv
                                            ? related.muscle_group_lv
                                            : related.muscle_group;
                                    return (
                                        <Link
                                            key={related.id}
                                            href={route(
                                                "exercises.show",
                                                related.id,
                                            )}
                                            className="flex items-center gap-4 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-600 transition-all group"
                                        >
                                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                                                <img
                                                    src={related.image_path}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                    alt={relatedName}
                                                />
                                            </div>
                                            <div className="overflow-hidden">
                                                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate uppercase tracking-tight">
                                                    {relatedName}
                                                </h4>
                                                <p className="text-[10px] text-zinc-500 font-bold uppercase">
                                                    {relatedMuscle}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
