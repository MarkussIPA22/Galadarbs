import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import '@/../css/calendar.css';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Dashboard({ auth }) {
  const { t } = useTranslation();
  const workouts = auth.user.workouts || [];
  const [value, setValue] = useState(new Date());
  const [completedDates, setCompletedDates] = useState([]);

  useEffect(() => {
    const dates = workouts
      .filter((w) => w.completed_at)
      .map((w) => new Date(w.completed_at));
    setCompletedDates(dates);
  }, [workouts]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isCompleted = completedDates.some(
        (d) =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
      );
      if (isCompleted) return 'completed-workout';
    }
    return '';
  };

  const completedWorkouts = workouts.filter((w) => w.completed_at);

  return (
    <AuthenticatedLayout>
      <Head title={t('dashboard')} />
      <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        <Sidebar auth={auth} />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {t('Welcome')}, {auth.user.name}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                {t('workouts_created')}
              </h3>
              <p className="text-2xl font-bold">{workouts.length}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                {t('completed_workouts')}
              </h3>
              <p className="text-2xl font-bold">{completedWorkouts.length}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                {t('next_workout')}
              </h3>
              <p className="text-2xl font-bold">
                {workouts.find((w) => !w.completed_at)?.name || t('no_workouts_yet')}
              </p>
            </div>
          </div>

          {/* Calendar */}
          <div className="max-w-md mx-auto mb-10">
            <Calendar
              onChange={setValue}
              value={value}
              tileClassName={tileClassName}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-md"
            />
          </div>

          {/* Completed Workouts List */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {t('completed_workouts')}
            </h2>

            {completedWorkouts.length > 0 ? (
              <ul className="space-y-3">
                {completedWorkouts.map((w) => (
                  <li
                    key={w.id}
                    className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <span className="font-medium">{w.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(w.completed_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {t('no_completed_workouts')}
              </p>
            )}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
