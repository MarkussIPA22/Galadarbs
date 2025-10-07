import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import StatCard from "@/Components/Workouts/StatCard";
import WorkoutCalendar from "@/Components/Workouts/WorkoutCalendar";
import CompletedWorkoutsList from "@/Components/CompletedWorkoutsList"; 
import "@/../css/calendar.css";
import { Head } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

  export default function Dashboard({ auth, workouts = [], completedLogs = [], hasCompletedToday = false }) {
  const [value, setValue] = useState(new Date());
  const [completedDates, setCompletedDates] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const dates = completedLogs.map((log) => new Date(log.created_at));
    setCompletedDates(dates);
  }, [completedLogs]);

  return (
    <AuthenticatedLayout>
      <Head title={t("dashboard")} />

      <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar auth={auth} />
        </div>

        <main className="flex-1 p-6 lg:p-8 overflow-hidden">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-emerald-500 dark:text-white mb-2 sm:mb-0">
                {t("Welcome")}, {auth.user.name}
              </h1>
            </div>
          </div>

              {!hasCompletedToday && (
  <div className="relative flex items-start gap-4 rounded-xl   dark:from-slate-700/50 dark:to-slate-600/50  da p-5 shadow-sm mb-6">
    <div className="flex-1">
      <h3 className="font-semibold text-black dark:text-white text-lg">
        {t("dont_forget_workout")}
      </h3>
      <p className="text-black dark:text-white text-sm mt-1">
        {t("workout_not_completed")}
      </p>
    </div>

    <div>
      <a
        href="my-workouts"
        className="inline-flex items-center rounded-lg bg-yellow-600  dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-900  px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 transition"
      >
        {t("start_workout")}
      </a>
    </div>
  </div>
)}



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title={t("Workouts_Created")}
              value={workouts.length}
              gradient="bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-800/50"
            />
            <StatCard
              title={t("Completed_Workouts")}
              value={completedLogs.length}
              gradient="bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-800/50"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <WorkoutCalendar
                value={value}
                onChange={setValue}
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const isCompleted = completedDates.some(
                      (d) =>
                        d.getFullYear() === date.getFullYear() &&
                        d.getMonth() === date.getMonth() &&
                        d.getDate() === date.getDate()
                    );
                    if (isCompleted) return "completed-workout";
                  }
                  return "";
                }}
                title={t("Workout_Calendar")}
                locale={i18n.language === "en" ? "en-US" : "lv-LV"}
              />
            </div>

            <div className="lg:col-span-2">
              <CompletedWorkoutsList
                completedLogs={completedLogs}
                title={t("Completed_Workouts")}
                emptyText={t("no_completed_workouts")}
                deletedText={t("deleted_workout")}
              />
            </div>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
