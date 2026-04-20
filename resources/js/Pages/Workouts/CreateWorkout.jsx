import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import MuscleGroupButton from "@/Components/Muscles/MuscleGroupButton";
import { Lock, Globe, CheckCircle2 } from "lucide-react";

export default function CreateWorkout({ auth }) {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        muscle_groups: [],
        is_private: false,
    });

    const muscleOptions = [
        "chest",
        "back",
        "shoulders",
        "biceps",
        "triceps",
        "legs",
        "abs",
        "forearms",
    ];

    const toggleMuscleGroup = (group) => {
        const groups = data.muscle_groups || [];
        setData(
            "muscle_groups",
            groups.includes(group)
                ? groups.filter((m) => m !== group)
                : [...groups, group],
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("workouts.store"));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t("create_workout")} />

            <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-200">
                <main className="flex-1 p-6 lg:p-10">
                    <div className="max-w-5xl mx-auto">
                        <header className="mb-10">
                            <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight italic uppercase">
                                {t("create_new_workout")}
                            </h1>
                        </header>

                        <form
                            onSubmit={submit}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                        >
                            <div className="lg:col-span-8 space-y-6">
                                <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                                                {t("workout_name")}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={t("Example")}
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 transition-all outline-none text-zinc-900 dark:text-white placeholder:text-zinc-500"
                                            />
                                            {errors.name && (
                                                <p className="mt-2 text-sm text-rose-500">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
                                                {t("description")}
                                            </label>
                                            <textarea
                                                rows="5"
                                                placeholder={t("DescWorkout")}
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 transition-all outline-none text-zinc-900 dark:text-white resize-none placeholder:text-zinc-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-6">
                                <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                                    <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                                        {t("muscle_groups")}
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {muscleOptions.map((muscle) => (
                                            <MuscleGroupButton
                                                key={muscle}
                                                group={muscle}
                                                isActive={data.muscle_groups.includes(
                                                    muscle,
                                                )}
                                                toggle={() =>
                                                    toggleMuscleGroup(muscle)
                                                }
                                                displayName={t(
                                                    muscle.toLowerCase(),
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`p-2 rounded-xl ${data.is_private ? "bg-amber-500/10 text-amber-500" : "bg-lime-500/10 text-lime-500"}`}
                                            >
                                                {data.is_private ? (
                                                    <Lock size={18} />
                                                ) : (
                                                    <Globe size={18} />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-none">
                                                    {data.is_private
                                                        ? t("Private")
                                                        : t("Public")}
                                                </h3>
                                                <p className="text-[10px] text-zinc-500 uppercase tracking-tight mt-1">
                                                    {t("Visibility")}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    "is_private",
                                                    !data.is_private,
                                                )
                                            }
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                                                data.is_private
                                                    ? "bg-amber-500"
                                                    : "bg-zinc-300 dark:bg-zinc-700"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${data.is_private ? "translate-x-6" : "translate-x-1"}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 mb-6"></div>
                                <button
                                    disabled={processing}
                                    className="w-full py-4 bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-black rounded-2xl transition-all duration-200 shadow-[0_4px_20px_rgba(163,230,53,0.3)] hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider"
                                >
                                    {processing
                                        ? t("saving...")
                                        : t("save_workout")}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
