import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";

export default function Tasks({ exercises = [], auth }) {
    const { t, i18n } = useTranslation();
    const [task, setTask] = useState(null);
    const [inputWeight, setInputWeight] = useState("");

    useEffect(() => {
        if (!exercises.length) return;

        const storedTask = localStorage.getItem("weeklyTask");
        let savedTask = storedTask ? JSON.parse(storedTask) : null;

        if (savedTask) {
            const dueDate = new Date(savedTask.dueDate);
            if (new Date() > dueDate) {
                localStorage.removeItem("weeklyTask");
                savedTask = null;
            }
        }

        if (savedTask) setTask(savedTask);
    }, [exercises]);

    const updateProgress = (e) => {
        e.preventDefault();
        const weight = parseInt(inputWeight);
        if (isNaN(weight) || weight < 0) return;

        const updatedTask = { ...task, progress: weight };
        if (weight >= task.target) updatedTask.completed = true;

        setTask(updatedTask);
        localStorage.setItem("weeklyTask", JSON.stringify(updatedTask));
        setInputWeight("");
    };

    if (!task) {
        return (
            <AuthenticatedLayout auth={auth}>
                <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                    <ResponsiveSidebar auth={auth} />
                    <main className="flex-1 p-6 max-w-6xl mx-auto text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            {t("no_task_found")}
                        </p>
                    </main>
                </div>
            </AuthenticatedLayout>
        );
    }

    const { exercise, target, startDate, dueDate, progress, completed } = task;

    const exerciseName =
        i18n.language === "lv"
            ? exercise.name_lv || exercise.name
            : exercise.name;

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
                            {t("start_date")}:{" "}
                            <span className="font-medium">
                                {new Date(startDate).toLocaleDateString()}
                            </span>
                        </p>
                        <p className="mb-4">
                            {t("due_date")}:{" "}
                            <span className="font-medium">
                                {new Date(dueDate).toLocaleDateString()}
                            </span>
                        </p>

                        <p className="mb-2">
                            {t("your_progress")}:{" "}
                            <span className="font-medium">{progress} kg</span>
                        </p>

                        <form onSubmit={updateProgress} className="mt-4">
                            <label className="block mb-2">
                                {t("enter_weight")}:
                                <input
                                    type="number"
                                    min="0"
                                    value={inputWeight}
                                    onChange={(e) =>
                                        setInputWeight(e.target.value)
                                    }
                                    className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
                                />
                            </label>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {t("update_progress")}
                            </button>
                        </form>

                        {completed ? (
                            <span className="inline-block mt-4 text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                                ✅ {t("completed")}
                            </span>
                        ) : (
                            <span className="inline-block mt-4 text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                {t("in_progress")}
                            </span>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
