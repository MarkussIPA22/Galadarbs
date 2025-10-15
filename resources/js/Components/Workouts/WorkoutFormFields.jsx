import React from "react";
import MuscleGroupButton from "../Muscles/MuscleGroupButton";

export default function WorkoutFormFields({
    data,
    setData,
    errors,
    muscleGroups,
    showFavorites,
    toggleMuscleGroup,
    toggleFavorites,
    t,
    displayMuscleGroup,
    editMode = false,
}) {
    return (
        <div className="space-y-8">
            <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wider">
                    {t("workout_name")}
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder={t("enter_workout_name")}
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 ${
                            errors.name
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
                        }`}
                    />
                    {data.name && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <svg
                                className="w-5 h-5 text-emerald-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4"
                                />
                            </svg>
                        </div>
                    )}
                </div>
                {errors.name && (
                    <p className="text-red-500 mt-2">{errors.name}</p>
                )}
            </div>

            <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wider">
                    {t("description")}{" "}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({t("optional")})
                    </span>
                </label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    rows="4"
                    className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 resize-none ${
                        errors.description
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20"
                    }`}
                />

                {!editMode && (
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-wider">
                            {t("muscle_groups")}
                            {data.muscle_groups.length > 0 && (
                                <span className="ml-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                                    {data.muscle_groups.length} {t("selected")}
                                </span>
                            )}
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {muscleGroups.map((group) => (
                                <MuscleGroupButton
                                    key={group}
                                    group={group}
                                    isActive={data.muscle_groups.includes(
                                        group
                                    )}
                                    isFavorite={group === "favorites"}
                                    toggle={() =>
                                        group === "favorites"
                                            ? toggleFavorites()
                                            : toggleMuscleGroup(group)
                                    }
                                    displayName={displayMuscleGroup(group)}
                                />
                            ))}
                        </div>
                        {errors.muscle_groups && (
                            <p className="text-red-500 mt-2">
                                {errors.muscle_groups}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
