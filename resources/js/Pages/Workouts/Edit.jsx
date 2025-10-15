import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import WorkoutFormFields from "@/Components/Workouts/WorkoutFormFields";
import { useTranslation } from "react-i18next";
import Sidebar from "@/Components/Sidebar";

export default function EditWorkout({
    auth,
    workout,
    exercises,
    favoriteExercises,
}) {
    const { t, i18n } = useTranslation();
    const { data, setData, put, processing, errors } = useForm({
        name: workout.name || "",
        description: workout.description || "",
        muscle_groups: workout.muscle_groups || [],
        exercises: workout.exercises.map((e) => e.id) || [],
    });

    const [showFavorites, setShowFavorites] = useState(false);
    const [filter, setFilter] = useState("");

    const toggleFavorites = () => setShowFavorites(!showFavorites);

    const toggleExercise = (id) => {
        if (data.exercises.includes(id)) {
            setData(
                "exercises",
                data.exercises.filter((exId) => exId !== id)
            );
        } else {
            setData("exercises", [...data.exercises, id]);
        }
    };

    const filteredExercises = exercises.filter((exercise) => {
        const matchesGroup = data.muscle_groups.includes(
            exercise.muscle_group.toLowerCase()
        );

        const matchesFavorites =
            !showFavorites || favoriteExercises.includes(exercise.id);

        return matchesGroup && matchesFavorites;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("workouts.update", workout.id));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <Sidebar auth={auth} />
                <main className="flex-1 p-6 sm:p-8 lg:p-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <WorkoutFormFields
                            data={data}
                            setData={setData}
                            errors={errors}
                            muscleGroups={data.muscle_groups}
                            showFavorites={showFavorites}
                            toggleMuscleGroup={() => {}}
                            toggleFavorites={toggleFavorites}
                            t={t}
                            displayMuscleGroup={(g) => t(g)}
                            editMode={true}
                        />

                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">
                                {t("select_exercises")}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredExercises.map((exercise) => {
                                    const isSelected = data.exercises.includes(
                                        exercise.id
                                    );

                                    const exerciseName =
                                        i18n.language === "lv"
                                            ? exercise.name_lv || exercise.name
                                            : exercise.name ||
                                              exercise.name_lv ||
                                              "";
                                    const exerciseMuscle =
                                        i18n.language === "lv"
                                            ? exercise.muscle_group_lv
                                            : exercise.muscle_group;

                                    return (
                                        <div
                                            key={exercise.id}
                                            onClick={() =>
                                                toggleExercise(exercise.id)
                                            }
                                            className={`cursor-pointer border-2 rounded-2xl overflow-hidden transition-all ${
                                                isSelected
                                                    ? "border-emerald-500 shadow-lg shadow-emerald-500/20 bg-white dark:bg-gray-800"
                                                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600"
                                            }`}
                                        >
                                            <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden rounded-t-2xl">
                                                {exercise.image_path ? (
                                                    <img
                                                        src={
                                                            exercise.image_path
                                                        }
                                                        alt={exerciseName}
                                                        className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-110"
                                                    />
                                                ) : (
                                                    <span className="text-5xl font-bold text-gray-400 dark:text-gray-600">
                                                        {exerciseName
                                                            ? exerciseName.charAt(
                                                                  0
                                                              )
                                                            : "?"}
                                                    </span>
                                                )}

                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                                                        <svg
                                                            className="w-5 h-5 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={3}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h3
                                                    className={`font-bold text-center mb-2 ${
                                                        isSelected
                                                            ? "text-emerald-900 dark:text-emerald-100"
                                                            : "text-gray-900 dark:text-white"
                                                    }`}
                                                >
                                                    {exerciseName}
                                                </h3>
                                                <div className="flex items-center justify-center gap-1">
                                                    <span
                                                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                                                            isSelected
                                                                ? "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200"
                                                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                                        }`}
                                                    >
                                                        {exerciseMuscle}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {filteredExercises.length === 0 && (
                                    <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                                        {t("no_exercises_found")}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-emerald-500 dark:bg-gradient-to-r  dark:from-purple-700 dark:to-purple-900 text-white rounded-xl"
                            >
                                {t("save_changes")}
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    (window.location.href = route(
                                        "workouts.start",
                                        workout.id
                                    ))
                                }
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {t("start_workout")}
                            </button>

                            <Link
                                href={route("workouts.index")}
                                className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl"
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
