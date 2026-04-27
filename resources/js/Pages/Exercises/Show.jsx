import React, { useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import { Heart } from "lucide-react";

export default function ExerciseShow({
    auth,
    exercise,
    relatedExercises = [],
    isFavorite = false,
    workout_id = null,
}) {
    const { t, i18n } = useTranslation();
    const isLv = i18n.language === "lv";

    const getField = (field) => {
        const lvField = `${field}_lv`;
        return isLv && exercise[lvField] ? exercise[lvField] : exercise[field];
    };

    const displayData = useMemo(
        () => ({
            name: getField("name"),
            description: getField("description"),
            muscleGroup: getField("muscle_group"),
            secondaryMuscles:
                isLv && exercise.secondary_muscles_lv?.length > 0
                    ? exercise.secondary_muscles_lv
                    : exercise.secondary_muscles || [],
        }),
        [exercise, isLv],
    );

    const handleToggleFavorite = () => {
        router.post(
            route("exercises.favorite", exercise.id),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={displayData.name} />

            <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
                <main className="flex-1 p-4 lg:p-10 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        <nav className="flex items-center justify-between mb-6">
                            <Link
                                href={
                                    workout_id
                                        ? route("workouts.edit", workout_id)
                                        : route("workouts.index")
                                }
                                className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                            >
                                ← {t("BACK")}
                            </Link>

                            <button
                                onClick={handleToggleFavorite}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md border text-xs font-bold transition-all ${
                                    isFavorite
                                        ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/20"
                                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"
                                }`}
                            >
                                <Heart
                                    size={16}
                                    strokeWidth={2.5}
                                    className={
                                        isFavorite
                                            ? "fill-emerald-500 text-emerald-500"
                                            : "text-zinc-400"
                                    }
                                />
                                {isFavorite ? t("Saved") : t("Save")}
                            </button>
                        </nav>

                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm mb-8">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-[400px] bg-zinc-100 dark:bg-zinc-800 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-700">
                                    <div className="aspect-square relative">
                                        {exercise.video_url ? (
                                            <iframe
                                                src={exercise.video_url}
                                                className="w-full h-full"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <img
                                                src={exercise.image_path}
                                                alt={displayData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-0.5 rounded bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-tight">
                                                {displayData.muscleGroup}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl lg:text-4xl font-black uppercase leading-tight mb-6">
                                            {displayData.name}
                                        </h1>

                                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                                            <div>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                                                    {t("Primary Muscle")}
                                                </p>
                                                <p className="text-sm font-bold">
                                                    {displayData.muscleGroup}
                                                </p>
                                            </div>

                                            <div className="col-span-2">
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                                                    {t("Secondary Focus")}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {displayData
                                                        .secondaryMuscles
                                                        .length > 0 ? (
                                                        displayData.secondaryMuscles.map(
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
                                        {displayData.description}
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
                                            href={route("exercises.show", {
                                                exercise: related.id,
                                                workout_id: workout_id,
                                            })}
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
                                                <h4 className="text-xs font-bold truncate uppercase tracking-tight">
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
