import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import '@/../css/calendar.css';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Dashboard({ auth, workouts = [], completedLogs = [] }) {
  const { t } = useTranslation();
  const [value, setValue] = useState(new Date());
  const [completedDates, setCompletedDates] = useState([]);

  useEffect(() => {
    const dates = completedLogs.map((log) => new Date(log.created_at));
    setCompletedDates(dates);
  }, [completedLogs]);

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

  return (
    <AuthenticatedLayout>
      <Head title={t('dashboard')} />

      <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <Sidebar auth={auth} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            {t('Welcome')}, {auth.user.name}!
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-sm sm:text-base text-gray-700 dark:text-gray-200">
                {t('Workouts Created')}
              </h3>
              <p className="text-xl sm:text-2xl font-bold">{workouts.length}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-sm sm:text-base text-gray-700 dark:text-gray-200">
                {t('Completed Workouts')}
              </h3>
              <p className="text-xl sm:text-2xl font-bold">{completedLogs.length}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-sm sm:text-base text-gray-700 dark:text-gray-200">
                {t('Next Workout')}
              </h3>
              <p className="text-xl sm:text-2xl font-bold break-words">
                {workouts.find((w) => !w.completed_at)?.name || t('No workouts yet')}
              </p>
            </div>
          </div>

          {/* Calendar */}
          <div className="w-full max-w-full sm:max-w-md mx-auto mb-10">
            <Calendar
              onChange={setValue}
              value={value}
              tileClassName={tileClassName}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-md p-2"
            />
          </div>

          {/* Completed Workouts */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md dark:shadow-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {t('completed workouts')}
            </h2>

            {completedLogs.length > 0 ? (
              <ul className="space-y-3">
                {completedLogs.map((log) => (
                  <li
                    key={log.id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <span className="font-medium mb-2 sm:mb-0">
                      {log.workout?.name || t('deleted_workout')}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(log.created_at).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                {t('no completed workouts')}
              </p>
            )}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
