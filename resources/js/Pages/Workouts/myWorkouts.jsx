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
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors">
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar auth={auth} />
        </div>

        <main className="flex-1 p-6 lg:p-8">
          <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                {t("Your_Workouts")}
              </h2>
              {workouts.length > 0 && (
                <span className="text-sm text-slate-500 dark:text-slate-400 dark:bg-slate-700 px-3 py-1 rounded-full font-medium">
                  {workouts.length} workout{workouts.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

         
            {workouts.length > 0 ? (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    t={t}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-300">
                {t("no_workouts_yet")}
              </p>
            )}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
