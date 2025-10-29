import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";
import axios from "axios";

export default function Tasks({ task: initialTask, exercises, auth }) {
    const { t, i18n } = useTranslation();
    const [task, setTask] = useState(initialTask);
    const [form, setForm] = useState({
        exercise_id: "",
        target: "",
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(route("tasks.store"), form);
            setTask(response.data);
            setForm({ exercise_id: "", target: "" });
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error(error);
            alert(t("failed_to_create_task"));
        } finally {
            setLoading(false);
        }
    };

    const resetTask = async () => {
        if (!task) return;
        if (!confirm(t("are_you_sure_reset"))) return;

        try {
            await axios.delete(route("tasks.destroy", task.id));
            setTask(null);
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error(error);
        }
    };

    if (!task) {
        return (
            <AuthenticatedLayout auth={auth}>
                <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                    <ResponsiveSidebar auth={auth} />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                        {t("create_your_task")}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {successMessage && (
                            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg animate-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center gap-3">
                                    <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                                        {successMessage}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="max-w-xl bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {t("new_weekly_task")}
                                </h2>
                            </div>

                            <form
                                onSubmit={handleCreateTask}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        {t("select_exercise")} *
                                    </label>
                                    <div className="relative">
                                        <select
                                            required
                                            value={form.exercise_id}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    exercise_id: e.target.value,
                                                })
                                            }
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                                        >
                                            <option value="">
                                                {t("choose_one")}
                                            </option>
                                            {exercises.map((ex) => (
                                                <option
                                                    key={ex.id}
                                                    value={ex.id}
                                                >
                                                    {i18n.language === "lv"
                                                        ? ex.name_lv || ex.name
                                                        : ex.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        {t("target_weight")}
                                    </label>
                                    <div className="relative">
                                        <input
                                            required
                                            type="number"
                                            min="500"
                                            step="0.5"
                                            value={form.target}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    target: e.target.value,
                                                })
                                            }
                                            placeholder=""
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg
                                                className="animate-spin h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            {t("creating")}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
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
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                            {t("create_task")}
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </main>
                </div>
            </AuthenticatedLayout>
        );
    }

    const { exercise, target, progress, completed, date } = task;

    const exerciseName =
        i18n.language === "lv"
            ? exercise?.name_lv || exercise?.name
            : exercise?.name;

    const progressPercentage = Math.min((progress / target) * 100, 100);

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                <ResponsiveSidebar auth={auth} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                    {t("your_task_for_this_week")}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg animate-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                                    {successMessage}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="max-w-3xl">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {exerciseName}
                                    </h2>
                                    {completed && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                                            <svg
                                                className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                                                {t("completed")}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {exercise?.image_path && (
                                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 mb-4">
                                        <img
                                            src={exercise.image_path}
                                            alt={exerciseName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                                {t("target")}
                                            </p>
                                            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                                {target} kg
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-2xl border border-cyan-200 dark:border-cyan-800">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                                                {t("progress")}
                                            </p>
                                            <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">
                                                {progress}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        {t("status")}:
                                    </span>
                                    {completed ? (
                                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold rounded-full">
                                            {t("completed")}
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold rounded-full">
                                            {t("in_progress")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
