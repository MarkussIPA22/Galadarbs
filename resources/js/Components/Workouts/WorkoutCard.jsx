import React from "react";
import { Link } from "@inertiajs/react";
import MuscleGroupBadge from "@/Components/Muscles/MuscleGroupBadge";

export default function WorkoutCard({ workout, t, onDelete }) {
  return (
    <div className="group p-6 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-all duration-200 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
        <div className="flex-1 mb-4 lg:mb-0">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {workout.name}
          </h3>

          {workout.description && (
            <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              {workout.description}
            </p>
          )}

          {workout.muscle_groups?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-sm font-medium text-slate-500 dark:text-white mr-2">
                {t("muscle_groups")}:
              </span>
              {workout.muscle_groups.map((group, i) => (
                <MuscleGroupBadge key={i} group={group} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 lg:ml-4">
          <Link
            href={route("workouts.start", workout.id)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-900 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium"
          >
            {t("Start_Workout")}
          </Link>

          <Link
            href={route("workouts.edit", workout.id)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600  dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-900 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium"
          >
            {t("edit")}
          </Link>

          <button
            onClick={() => onDelete(workout.id)}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium"
          >
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
