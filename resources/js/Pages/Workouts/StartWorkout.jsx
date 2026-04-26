import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import jsPDF from "jspdf";
import "@/fonts/Roboto-Regular-normal.js";

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
            <div className="inline-flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-sm font-black tabular-nums text-zinc-900 dark:text-white">
                    {mins}:{secs}
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase">
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
            prevSets: prevEx?.sets || [],
        };
    });

    const [exerciseData, setExerciseData] = useState(() =>
        workout.exercises.map((ex) => ({
            ...ex,
            sets:
                ex.sets?.length > 0 ? [...ex.sets] : [{ reps: "", weight: "" }],
        })),
    );

    const handleSetChange = (exIndex, setIndex, field, value) => {
        setExerciseData((prevData) => {
            const newData = [...prevData];
            const newSets = [...newData[exIndex].sets];
            newSets[setIndex] = { ...newSets[setIndex], [field]: value };
            newData[exIndex] = { ...newData[exIndex], sets: newSets };
            return newData;
        });
    };

    const handleAddSet = (exIndex) => {
        const newData = [...exerciseData];
        const lastSet = newData[exIndex].sets[newData[exIndex].sets.length - 1];
        newData[exIndex].sets.push({
            reps: lastSet.reps,
            weight: lastSet.weight,
        });
        setExerciseData(newData);
    };

    const handleRemoveSet = (exIndex, setIndex) => {
        if (exerciseData[exIndex].sets.length > 1) {
            const newData = [...exerciseData];
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

        doc.setFont("Roboto-Regular", "normal");

        doc.setFontSize(18);
        doc.text(`${t("workout")}: ${workout.name}`, 10, 20);

        let y = 35;
        const currentLang = i18n.language;

        exerciseData.forEach((ex, idx) => {
            if (y > 270) {
                doc.addPage();
                doc.setFont("Roboto-Regular", "normal");
                y = 20;
            }

            const name = currentLang === "lv" ? ex.name_lv || ex.name : ex.name;
            doc.setFontSize(14);
            doc.setTextColor(40);
            doc.text(`${idx + 1}. ${name}`, 10, y);
            y += 7;

            ex.sets.forEach((set, sIdx) => {
                doc.setFontSize(11);
                doc.setTextColor(100);
                doc.text(
                    `${t("set")} ${sIdx + 1}: ${set.reps} x ${set.weight}kg`,
                    15,
                    y,
                );
                y += 6;
            });
            y += 5;
        });

        doc.save(`${workout.name.replace(/\s/g, "_")}.pdf`);
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-5 lg:p-8">
                <div className="max-w-5xl mx-auto">
                    <WorkoutHeader
                        name={workout.name}
                        exerciseCount={exerciseData.length}
                        t={t}
                    />

                    <form onSubmit={handleSaveWorkout} className="space-y-6">
                        {exerciseData.map((ex, exIndex) => {
                            const prevEx = previousExercises.find(
                                (p) => p.id === ex.id,
                            );

                            return (
                                <div
                                    key={ex.id}
                                    className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden"
                                >
                                    <div className="flex items-center gap-3 px-5 py-4 bg-zinc-50/50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center text-black font-black text-sm">
                                            {exIndex + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-zinc-900 dark:text-white">
                                                {i18n.language === "lv"
                                                    ? ex.name_lv || ex.name
                                                    : ex.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="grid grid-cols-12 gap-4 mb-3 px-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                            <span className="col-span-1">
                                                {t("set")}
                                            </span>
                                            <span className="col-span-4">
                                                {t("previous_workout")}
                                            </span>
                                            <span className="col-span-3">
                                                KG
                                            </span>
                                            <span className="col-span-3">
                                                REPS
                                            </span>
                                            <span className="col-span-1"></span>
                                        </div>

                                        <div className="space-y-3">
                                            {ex.sets.map((set, setIndex) => {
                                                const prev =
                                                    prevEx?.prevSets?.[
                                                        setIndex
                                                    ];
                                                return (
                                                    <div
                                                        key={setIndex}
                                                        className="grid grid-cols-12 gap-3 items-center"
                                                    >
                                                        <span className="col-span-1 text-xs font-bold text-zinc-400">
                                                            {setIndex + 1}
                                                        </span>

                                                        <div className="col-span-4 text-xs text-zinc-500 italic">
                                                            {prev
                                                                ? `${prev.weight}kg × ${prev.reps}`
                                                                : "—"}
                                                        </div>

                                                        <div className="col-span-3">
                                                            <input
                                                                type="number"
                                                                step="0.5"
                                                                value={
                                                                    set.weight
                                                                }
                                                                onChange={(e) =>
                                                                    handleSetChange(
                                                                        exIndex,
                                                                        setIndex,
                                                                        "weight",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                disabled={
                                                                    finished
                                                                }
                                                                className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-sm focus:ring-lime-400"
                                                                placeholder={
                                                                    prev?.weight ||
                                                                    "0"
                                                                }
                                                            />
                                                        </div>

                                                        <div className="col-span-3">
                                                            <input
                                                                type="number"
                                                                value={set.reps}
                                                                onChange={(e) =>
                                                                    handleSetChange(
                                                                        exIndex,
                                                                        setIndex,
                                                                        "reps",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                disabled={
                                                                    finished
                                                                }
                                                                className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-sm focus:ring-lime-400"
                                                                placeholder={
                                                                    prev?.reps ||
                                                                    "0"
                                                                }
                                                            />
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveSet(
                                                                    exIndex,
                                                                    setIndex,
                                                                )
                                                            }
                                                            disabled={
                                                                finished ||
                                                                ex.sets
                                                                    .length ===
                                                                    1
                                                            }
                                                            className="col-span-1 text-zinc-400 hover:text-red-500 disabled:opacity-0 transition-colors"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {!finished && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleAddSet(exIndex)
                                                }
                                                className="mt-4 w-full py-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:border-lime-400 hover:text-lime-500 transition-all"
                                            >
                                                + {t("add_set")}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {!finished ? (
                                <button
                                    type="submit"
                                    className="flex-1 bg-lime-400 hover:bg-lime-300 text-black font-bold py-4 rounded-2xl shadow-lg shadow-lime-400/20 transition-all"
                                >
                                    {t("save_workout")}
                                </button>
                            ) : (
                                <div className="flex-1 bg-lime-400/10 border border-lime-400 text-lime-600 dark:text-lime-400 font-bold py-4 rounded-2xl text-center">
                                    ✓ {t("Workout_completed")}
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={downloadPDF}
                                className="px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold dark:text-white"
                            >
                                {t("download_pdf")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
