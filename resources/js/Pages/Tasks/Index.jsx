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

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(route("tasks.store"), form);
            setTask(response.data);
            setForm({ exercise_id: "", target: "" });
        } catch (error) {
            console.error(error);
            alert("Failed to create task");
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
        } catch (error) {
            console.error(error);
        }
    };

    if (!task) {
        return (
            <AuthenticatedLayout auth={auth}>
                <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                    <ResponsiveSidebar auth={auth} />
                    <main className="flex-1 p-6 max-w-6xl mx-auto">
                        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
                            {t("create_your_task")}
                        </h1>

                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                            <form
                                onSubmit={handleCreateTask}
                                className="space-y-4"
                            >
                                <label className="block">
                                    {t("select_exercise")}:
                                    <select
                                        required
                                        value={form.exercise_id}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                exercise_id: e.target.value,
                                            })
                                        }
                                        className="block w-full mt-1 p-2 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                    >
                                        <option value="">
                                            {t("choose_one")}
                                        </option>
                                        {exercises.map((ex) => (
                                            <option key={ex.id} value={ex.id}>
                                                {i18n.language === "lv"
                                                    ? ex.name_lv || ex.name
                                                    : ex.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block">
                                    {t("target_weight")} (kg):
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        value={form.target}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                target: e.target.value,
                                            })
                                        }
                                        className="block w-full mt-1 p-2 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    {loading ? t("creating") : t("create_task")}
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

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                <ResponsiveSidebar auth={auth} />
                <main className="flex-1 p-6 max-w-6xl mx-auto">
                    <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
                        {t("your_task_for_this_week")}
                    </h1>

                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                            {exerciseName}
                        </h2>

                        <p className="mb-2">
                            {t("target")}:{" "}
                            <span className="font-medium">{target} kg</span>
                        </p>
                        <p className="mb-2">
                            {t("progress")}:{" "}
                            <span className="font-medium">{progress} kg</span>
                        </p>
                        <p className="mb-4">
                            {t("status")}:{" "}
                            {completed ? (
                                <span className="text-green-500">
                                    {t("completed")}
                                </span>
                            ) : (
                                <span className="text-yellow-500">
                                    {t("in_progress")}
                                </span>
                            )}
                        </p>

                        <button
                            onClick={resetTask}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            {t("reset_task")}
                        </button>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
