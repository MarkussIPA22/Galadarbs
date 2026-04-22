import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import ExerciseCard from "@/Components/Exercise/ExerciseCard";
import { router } from '@inertiajs/react'

function WorkoutHeader({ name, exerciseCount, t }) {
    const [elapsed, setElapsed] = useState(0);
    const startRef = useRef(Date.now());

    useEffect(() => {
        const id = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const secs = String(elapsed % 60).padStart(2, "0");

    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                    {exerciseCount} {t("exercises") || "exercises"}
                </p>
                <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
                    {name}
                </h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-sm font-black tabular-nums text-zinc-900 dark:text-white">
                    {mins}:{secs}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold">
                    {t("elapsed")}
                </span>
            </div>
        </div>
    );
}

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
        })),
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
        router.post(route("workout-logs.store"), workoutData, {
            preserveScroll: true,
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
                    `${t("set")} ${setIndex + 1}: ${set.reps} ${t("reps")} × ${set.weight} kg`,
                    15,

                    y,
                );
                y += 6;
            });
            y += 6;
        });
        doc.save(`${workout.name.replace(/\s/g, "_")}.pdf`);
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="flex flex-col md:flex-row min-h-screen bg-zinc-100 dark:bg-zinc-950 transition-colors duration-200">
                <main className="flex-1 p-5 lg:p-8 overflow-hidden">
                    <WorkoutHeader
                        name={workout.name}
                        exerciseCount={exerciseData.length}
                        t={t}
                    />

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
                        <div className="xl:col-span-3">
                            <form
                                onSubmit={handleSaveWorkout}
                                className="space-y-4"
                            >
                                {exerciseData.map((ex, exIndex) => {
                                    const prevEx = previousExercises.find(
                                        (p) => p.id === ex.id,
                                    );
                                    return (
                                        <div
                                            key={ex.id}
                                            className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                                        >
                                            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                                                <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center text-black font-black text-xs flex-shrink-0">
                                                    {exIndex + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-zinc-900 dark:text-white text-sm">
                                                        {i18n.language ===
                                                            "lv" && ex.name_lv
                                                            ? ex.name_lv
                                                            : ex.name}
                                                    </h3>
                                                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                                                        {i18n.language ===
                                                            "lv" &&
                                                        ex.muscle_group_lv
                                                            ? ex.muscle_group_lv
                                                            : ex.muscle_group}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-5">
                                                <div className="grid grid-cols-12 gap-2 mb-2 px-1">
                                                    <span className="col-span-1 text-[10px] font-bold uppercase tracking-widest text-black  dark:text-white">
                                                        {t("Set")}
                                                    </span>
                                                    <span className="col-span-4 text-[10px] font-bold uppercase tracking-widest text-black  dark:text-white">
                                                        {prevEx?.prevSets
                                                            ?.length
                                                            ? "Previous"
                                                            : ""}
                                                    </span>
                                                    <span className="col-span-3 text-[10px] font-bold uppercase tracking-widest text-black  dark:text-white">
                                                        {t("kg") || "kg"}
                                                    </span>
                                                    <span className="col-span-3 text-[10px] font-bold uppercase tracking-widest text-black  dark:text-white">
                                                        {t("reps") || "reps"}
                                                    </span>
                                                    <span className="col-span-1" />
                                                </div>

                                                <div className="space-y-2">
                                                    {ex.sets.map(
                                                        (set, setIndex) => {
                                                            const prev =
                                                                prevEx
                                                                    ?.prevSets?.[
                                                                    setIndex
                                                                ];
                                                            return (
                                                                <div
                                                                    key={
                                                                        setIndex
                                                                    }
                                                                    className="grid grid-cols-12 gap-2 items-center"
                                                                >
                                                                    <div className="col-span-1">
                                                                        <span className="text-xs font-black text-zinc-400 dark:text-zinc-500">
                                                                            {setIndex +
                                                                                1}
                                                                        </span>
                                                                    </div>

                                                                    <div className="col-span-4">
                                                                        {prev ? (
                                                                            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                                                                                {
                                                                                    prev.weight
                                                                                }
                                                                                kg
                                                                                ×{" "}
                                                                                {
                                                                                    prev.reps
                                                                                }
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-xs text-zinc-300 dark:text-zinc-700">
                                                                                —
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    <div className="col-span-3 ">
                                                                        <input
                                                                            type="number"
                                                                            min="0"
                                                                            step="0.5"
                                                                            placeholder={
                                                                                prev?.weight ??
                                                                                "0"
                                                                            }
                                                                            value={
                                                                                set.weight
                                                                            }
                                                                            disabled={
                                                                                finished
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                handleSetChange(
                                                                                    exIndex,
                                                                                    setIndex,
                                                                                    "weight",
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            className="w-full px-3 py-2 rounded-lg text-sm font-semibold text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-colors placeholder-zinc-300 dark:placeholder-zinc-600 disabled:opacity-50"
                                                                        />
                                                                    </div>

                                                                    <div className="col-span-3">
                                                                        <input
                                                                            type="number"
                                                                            min="0"
                                                                            placeholder={
                                                                                prev?.reps ??
                                                                                "0"
                                                                            }
                                                                            value={
                                                                                set.reps
                                                                            }
                                                                            disabled={
                                                                                finished
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                handleSetChange(
                                                                                    exIndex,
                                                                                    setIndex,
                                                                                    "reps",
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }
                                                                            className="w-full px-3 py-2 rounded-lg text-sm font-semibold text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-colors placeholder-zinc-300 dark:placeholder-zinc-600 disabled:opacity-50"
                                                                        />
                                                                    </div>

                                                                    <div className="col-span-1 flex justify-end">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleRemoveSet(
                                                                                    exIndex,
                                                                                    setIndex,
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                ex
                                                                                    .sets
                                                                                    .length ===
                                                                                    1 ||
                                                                                finished
                                                                            }
                                                                            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-300 dark:text-zinc-600 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                                                        >
                                                                            ✕
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </div>

                                                {!finished && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleAddSet(
                                                                exIndex,
                                                            )
                                                        }
                                                        className="mt-3 w-full py-2 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:border-lime-400 hover:text-lime-600 dark:hover:text-lime-400 transition-all"
                                                    >
                                                        +{" "}
                                                        {t("add_set") ||
                                                            "Add Set"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {!finished ? (
                                            <button
                                                type="submit"
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-lime-400 hover:bg-lime-300 text-black rounded-xl font-bold text-sm shadow-[0_0_16px_rgba(163,230,53,0.25)] hover:shadow-[0_0_24px_rgba(163,230,53,0.4)] transition-all duration-200"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={3}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                {t("save_workout")}
                                            </button>
                                        ) : (
                                            <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-lime-400/10 border border-lime-400/30 text-lime-700 dark:text-lime-400 font-bold text-sm">
                                                <span>✓</span>
                                                {t("workout_completed")}
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={downloadPDF}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-bold text-sm border border-zinc-200 dark:border-zinc-700 transition-all duration-200"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            {t("download_pdf")}
                                        </button>

                                        <Link
                                            href={route("workouts.index")}
                                            className="sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-xl font-bold text-sm border border-zinc-200 dark:border-zinc-700 hover:border-red-200 dark:hover:border-red-500/20 transition-all duration-200"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            {t("cancel")}
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
