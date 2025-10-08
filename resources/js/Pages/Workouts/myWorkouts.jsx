import React from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import WorkoutCard from "@/Components/Workouts/WorkoutCard";
import { useTranslation } from "react-i18next";

export default function MyWorkouts({ auth }) {
  const { t } = useTranslation();
  const { workouts } = usePage().props;

  const handleDelete = (id) => {
    if (confirm(t("confirm_delete"))) {
      router.delete(route("workouts.destroy", id));
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar auth={auth} />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {t("Your_Workouts")}
                </h1>
               
                    
              </div>

              {workouts.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {workouts.length}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {workouts.length === 1
                          ? t("workout_number")
                          : t("workout_number_plural")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {workouts.length > 0 ? (
            <div className="space-y-4">
              {workouts.map((workout, index) => (
                <div
                  key={workout.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in-up"
                >
                  <WorkoutCard
                    workout={workout}
                    t={t}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg
                  className="w-12 h-12 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t("no_workouts_yet")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
                Start building your fitness routine by creating your first workout
              </p>
              <a
                href={route("workouts.create")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Your First Workout</span>
              </a>
            </div>
          )}
        </main>
      </div>
    </AuthenticatedLayout>
  );
}