import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import '@/../css/calendar.css'; 
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
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

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard" />
      <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        <Sidebar auth={auth} />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Welcome, {auth.user.name}!
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Workouts Created
              </h3>
              <p className="text-2xl font-bold">{workouts.length}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Completed Workouts
              </h3>
              <p className="text-2xl font-bold">
                {workouts.filter((w) => w.completed_at).length}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
              <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                Next Workout
              </h3>
              <p className="text-2xl font-bold">
                {workouts.find((w) => !w.completed_at)?.name || 'No workouts yet'}
              </p>
            </div>
          </div>

          {/* Calendar */}
          <div className="max-w-md mx-auto">
            <Calendar
              onChange={setValue}
              value={value}
              tileClassName={tileClassName}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-md"
            />
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
