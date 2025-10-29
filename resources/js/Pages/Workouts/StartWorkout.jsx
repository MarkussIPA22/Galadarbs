import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/ResponsiveSidebar";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import ExerciseCard from "@/Components/Exercise/ExerciseCard";

export default function StartWorkout({ auth, workout, latest_log }) {
    const { t, i18n } = useTranslation();
    const [finished, setFinished] = useState(false);

    const previousExercises = workout.exercises.map((ex) => {
        const prevEx = latest_log?.exercises?.find((p) => p.id === ex.id);
        return {
            id: ex.id,
            name: ex.name,
            muscle_group: ex.muscle_group,
            prevSets: prevEx?.sets || [],
        };
    });

    const [exerciseData, setExerciseData] = useState(() =>
        workout.exercises.map((ex) => ({
            id: ex.id,
            name: ex.name,
            name_lv: ex.name_lv,
            muscle_group: ex.muscle_group,
            muscle_group_lv: ex.muscle_group_lv,
            sets:
                ex.sets && ex.sets.length > 0
                    ? ex.sets
                    : [{ reps: "", weight: "" }],
        }))
    );

    const handleSetChange = (exIndex, setIndex, field, value) => {
        const newData = [...exerciseData];
        newData[exIndex].sets[setIndex][field] = value;
        setExerciseData(newData);
    };

    const handleAddSet = (exIndex) => {
        const newData = [...exerciseData];
        newData[exIndex].sets.push({ reps: "", weight: "" });
        setExerciseData(newData);
    };

    const handleRemoveSet = (exIndex, setIndex) => {
        const newData = [...exerciseData];
        if (newData[exIndex].sets.length > 1) {
            newData[exIndex].sets.splice(setIndex, 1);
            setExerciseData(newData);
        }
    };

    const handleSaveWorkout = (e) => {
        e.preventDefault();
        const workoutData = {
            workout_id: workout.id,
            exercises: exerciseData.map((ex) => ({
                id: ex.id,
                sets: ex.sets.map((s) => ({
                    reps: parseInt(s.reps) || 0,
                    weight: parseFloat(s.weight) || 0,
                })),
            })),
        };
        Inertia.post(route("workout-logs.store"), workoutData, {
            preserveState: true,
            onSuccess: () => setFinished(true),
        });
    };

    const handleFinishWorkout = () => {
        const workoutData = {
            workout_id: workout.id,
            exercises: exerciseData.map((ex) => ({
                id: ex.id,
                sets: ex.sets.map((s) => ({
                    reps: parseInt(s.reps) || 0,
                    weight: parseFloat(s.weight) || 0,
                })),
            })),
        };

        Inertia.post(route("workout-logs.store"), workoutData, {
            onSuccess: () => setFinished(true),
        });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`${t("workout")}: ${workout.name}`, 10, 20);

        const currentLang = i18n.language;
        let y = 30;

        (latest_log?.exercises || []).forEach((logEx, exIndex) => {
            const ex = workout.exercises.find((e) => e.id === logEx.id);

            if (!ex) return;

            const exName =
                currentLang === "lv" && ex.name_lv ? ex.name_lv : ex.name;
            const exMuscle =
                currentLang === "lv" && ex.muscle_group_lv
                    ? ex.muscle_group_lv
                    : ex.muscle_group;

            doc.setFontSize(14);
            doc.text(`${exIndex + 1}. ${exName} (${exMuscle})`, 10, y);
            y += 8;

            (logEx.sets || []).forEach((set, setIndex) => {
                doc.setFontSize(12);
                doc.text(
                    `Set ${setIndex + 1}: ${set.reps} reps × ${set.weight} kg`,
                    15,
                    y
                );
                y += 6;
            });

            y += 6;
        });

        doc.save(`${workout.name.replace(/\s/g, "_")}.pdf`);
    };

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors">
                <div className="w-full md:w-64 flex-shrink-0">
                    <Sidebar auth={auth} />
                </div>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-500/10 rounded-xl">
                                <svg
                                    className="w-8 h-8 text-emerald-600 dark:text-emerald-400"
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
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                                    {workout.name}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSaveWorkout} className="space-y-6">
                        {exerciseData.map((ex, exIndex) => {
                            const prevEx = previousExercises.find(
                                (p) => p.id === ex.id
                            );
                            return (
                                <ExerciseCard
                                    key={ex.id}
                                    exercise={ex}
                                    prevExercise={prevEx}
                                    exIndex={exIndex}
                                    handleSetChange={handleSetChange}
                                    handleAddSet={handleAddSet}
                                    handleRemoveSet={handleRemoveSet}
                                    finished={finished}
                                    t={t}
                                />
                            );
                        })}

                        <div className=" bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
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
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {t("save_workout")}
                                </button>

                                <button
                                    type="button"
                                    onClick={downloadPDF}
                                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
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
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    {t("download_pdf")}
                                </button>

                                <Link
                                    href={route("workouts.index")}
                                    className="sm:flex-none px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold text-center shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
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
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    {t("cancel")}
                                </Link>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
