import React, { useState, useMemo, useRef } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import WorkoutFormFields from "@/Components/Workouts/WorkoutFormFields";
import { useTranslation } from "react-i18next";
import { Plus, X, Upload, Info, Search, Check, ArrowDown } from "lucide-react";

function CreateExerciseModal({ isOpen, onClose, t }) {
    if (!isOpen) return null;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        muscle_group: "Chest",
        description: "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("exercises.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-black dark:text-white mb-6 tracking-tight">
                    {t("Create your own exercise")}
                </h2>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">
                            {t("exercise_name")}
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-5 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-2 font-bold">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">
                            {t("muscle_group")}
                        </label>
                        <select
                            value={data.muscle_group}
                            onChange={(e) =>
                                setData("muscle_group", e.target.value)
                            }
                            className="w-full px-5 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all appearance-none"
                        >
                            {[
                                "Chest",
                                "Back",
                                "Biceps",
                                "Triceps",
                                "Legs",
                                "Shoulders",
                                "Abs",
                                "Forearms",
                            ].map((m) => (
                                <option key={m} value={m}>
                                    {t(m.toLowerCase())}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">
                            {t("Exercise image")}
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="hidden"
                                id="exercise-image-upload"
                                accept="image/*"
                            />
                            <label
                                htmlFor="exercise-image-upload"
                                className="flex flex-col items-center justify-center gap-3 w-full p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                            >
                                <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    <Upload size={24} />
                                </div>
                                <span className="text-sm font-bold text-zinc-500 text-center">
                                    {data.image
                                        ? data.image.name
                                        : t("Click to upload")}
                                </span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50"
                    >
                        {processing ? t("saving") : t("create_exercise")}
                    </button>
                </form>
            </div>
        </div>
    );
}

function ExerciseCard({ exercise, workout, isSelected, onToggle, t, i18n }) {
    const name =
        i18n.language === "lv"
            ? exercise.name_lv || exercise.name
            : exercise.name;
    const muscle =
        i18n.language === "lv"
            ? exercise.muscle_group_lv || exercise.muscle_group
            : exercise.muscle_group;

    return (
        <div
            className={`group relative flex flex-col rounded-[2.5rem] border-4 transition-all duration-300 overflow-hidden ${
                isSelected
                    ? "border-emerald-500 bg-white dark:bg-zinc-900 shadow-xl scale-[1.02]"
                    : "border-transparent bg-white dark:bg-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 shadow-sm"
            }`}
        >
            <div
                onClick={onToggle}
                className="aspect-square bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center p-6 relative overflow-hidden cursor-pointer"
            >
                {exercise.image_path ? (
                    <img
                        src={exercise.image_path}
                        alt={name}
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <span className="text-4xl font-black text-zinc-300 dark:text-zinc-700 uppercase">
                        {name.charAt(0)}
                    </span>
                )}

                <div
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                            ? "bg-emerald-500 text-white scale-100"
                            : "bg-white/50 dark:bg-zinc-800/50 text-transparent scale-0"
                    }`}
                >
                    <Check size={24} strokeWidth={4} />
                </div>

                <Link
                    href={route("exercises.show", {
                        exercise: exercise.id,
                        workout_id: workout.id,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-4 right-4 p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full text-zinc-500 hover:text-emerald-500 transition-colors shadow-lg"
                >
                    <Info size={18} />
                </Link>
            </div>

            <div className="p-6 text-center">
                <Link
                    href={route("exercises.show", {
                        exercise: exercise.id,
                        workout_id: workout.id,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="block text-lg font-black dark:text-white hover:text-emerald-500 transition-colors truncate"
                >
                    {name}
                </Link>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-1">
                    {muscle}
                </p>
            </div>
        </div>
    );
}

export default function EditWorkout({
    auth,
    workout,
    exercises,
    favoriteExercises,
}) {
    const { t, i18n } = useTranslation();
    const [showFavorites, setShowFavorites] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const saveSectionRef = useRef(null);

    const { data, setData, put, processing, errors } = useForm({
        name: workout.name || "",
        description: workout.description || "",
        muscle_groups: workout.muscle_groups || [],
        exercises: workout.exercises.map((e) => e.id) || [],
    });

    const toggleMuscleGroup = (group) => {
        const lowerGroup = group.toLowerCase();
        const nextGroups = data.muscle_groups.includes(lowerGroup)
            ? data.muscle_groups.filter((g) => g !== lowerGroup)
            : [...data.muscle_groups, lowerGroup];
        setData("muscle_groups", nextGroups);
    };

    const toggleExercise = (id) => {
        const nextExercises = data.exercises.includes(id)
            ? data.exercises.filter((i) => i !== id)
            : [...data.exercises, id];
        setData("exercises", nextExercises);
    };

    const scrollToSave = () => {
        saveSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const filteredExercises = useMemo(() => {
        return exercises.filter((ex) => {
            const name =
                i18n.language === "lv" ? ex.name_lv || ex.name : ex.name;
            const matchesSearch = name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesGroup =
                data.muscle_groups.length === 0 ||
                data.muscle_groups.includes(ex.muscle_group.toLowerCase());
            const matchesFav =
                !showFavorites || favoriteExercises.includes(ex.id);
            return matchesSearch && matchesGroup && matchesFav;
        });
    }, [
        exercises,
        searchQuery,
        data.muscle_groups,
        showFavorites,
        i18n.language,
        favoriteExercises,
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("workouts.update", workout.id));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t("edit_workout")} />

            <CreateExerciseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                t={t}
            />

            <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
                <main className="flex-1 p-4 sm:p-8 lg:p-12 max-w-[1600px] mx-auto w-full">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-3xl font-black tracking-tight dark:text-white mb-8">
                                {t("edit_workout")}
                            </h2>
                            <WorkoutFormFields
                                data={data}
                                setData={setData}
                                errors={errors}
                                muscleGroups={data.muscle_groups}
                                showFavorites={showFavorites}
                                toggleMuscleGroup={toggleMuscleGroup}
                                toggleFavorites={() =>
                                    setShowFavorites(!showFavorites)
                                }
                                t={t}
                                displayMuscleGroup={(g) => t(g)}
                                editMode={true}
                            />
                        </section>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                <button
                                    type="button"
                                    onClick={scrollToSave}
                                    className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 border border-transparent whitespace-nowrap"
                                >
                                    <ArrowDown size={16} strokeWidth={3} />
                                    {t("Jump to Save")}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 dark:text-white rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
                                >
                                    <Plus size={16} strokeWidth={3} />
                                    {t("create_exercise")}
                                </button>
                            </div>

                            <div className="relative w-full lg:w-80">
                                <input
                                    type="text"
                                    placeholder={t("search_exercises")}
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <Search size={20} />
                                </div>
                            </div>
                        </div>

                        <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                {filteredExercises.map((exercise) => (
                                    <ExerciseCard
                                        key={exercise.id}
                                        exercise={exercise}
                                        workout={workout}
                                        isSelected={data.exercises.includes(
                                            exercise.id,
                                        )}
                                        onToggle={() =>
                                            toggleExercise(exercise.id)
                                        }
                                        t={t}
                                        i18n={i18n}
                                    />
                                ))}
                            </div>

                            {filteredExercises.length === 0 && (
                                <div className="text-center py-20 bg-zinc-100 dark:bg-zinc-900/50 rounded-[2rem] border-2 border-dashed border-zinc-300 dark:border-zinc-800">
                                    <p className="text-zinc-500 font-bold">
                                        {t("no_exercises_found")}
                                    </p>
                                </div>
                            )}
                        </section>

                        <div
                            ref={saveSectionRef}
                            className="flex flex-wrap justify-center gap-4 p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-sm"
                        >
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                            >
                                {processing ? t("saving") : t("save_changes")}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    (window.location.href = route(
                                        "workouts.start",
                                        workout.id,
                                    ))
                                }
                                className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                            >
                                {t("start_workout")}
                            </button>

                            <Link
                                href={route("workouts.index")}
                                className="px-8 py-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl font-bold text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all"
                            >
                                {t("cancel")}
                            </Link>
                        </div>
                    </form>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
