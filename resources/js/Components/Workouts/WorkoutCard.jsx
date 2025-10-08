import React from "react";
import { Link } from "@inertiajs/react";
import MuscleGroupBadge from "@/Components/Muscles/MuscleGroupBadge";

export default function WorkoutCard({ workout, t, onDelete }) {
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/5 to-teal-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="relative p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4 mb-4">
             
              
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                  {workout.name}
                </h3>
                
                {workout.description && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                    {workout.description}
                  </p>
                )}
              </div>
            </div>

            {/* Muscle Groups */}
            {workout.muscle_groups?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{t("muscle_groups")}:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {workout.muscle_groups.map((group, i) => (
                    <MuscleGroupBadge key={i} group={group} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
            <Link
              href={route("workouts.start", workout.id)}
              className="group/btn relative overflow-hidden px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold  text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("Start_Workout")}
              </span>
            </Link>

            <Link
              href={route("workouts.edit", workout.id)}
              className="px-5 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-900 dark:text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-center group/edit"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/edit:text-blue-600 dark:group-hover/edit:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t("edit")}
              </span>
            </Link>

            <button
              onClick={() => onDelete(workout.id)}
              className="px-5 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-900 dark:text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 group/delete"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/delete:text-red-600 dark:group-hover/delete:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {t("delete")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}