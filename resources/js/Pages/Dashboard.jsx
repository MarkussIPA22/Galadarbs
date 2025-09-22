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

  const getCompletionRate = () => {
    if (workouts.length === 0) return 0;
    return Math.round((completedLogs.length / workouts.length) * 100);
  };

  return (
    <AuthenticatedLayout>
      <Head title={t('dashboard')} />

      <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors">
       
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar auth={auth} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-hidden">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-2 sm:mb-0">
                {t('Welcome')}, {auth.user.name}
              </h1>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
               
              </div>
            </div>
           
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="relative bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-slate-700/50 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 dark:from-blue-400/5 dark:to-indigo-400/5"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t('Workouts_Created')}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                    {workouts.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-slate-700/50 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 dark:from-emerald-400/5 dark:to-green-400/5"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t('Completed_Workouts')}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                    {completedLogs.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-slate-700/50 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-600/5 dark:from-purple-400/5 dark:to-violet-400/5"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Completion Rate
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                    {getCompletionRate()}%
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white to-amber-50 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-slate-700/50 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5 dark:from-amber-400/5 dark:to-orange-400/5"></div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    {t('Next_Workout')}
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mt-2 leading-tight">
                    {workouts.find((w) => !w.completed_at)?.name || t('No workouts yet')}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
            <div className="lg:col-span-1">
              <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                   {t('Workout_Calendar')}
                </h2>
                <div className="flex justify-center">
                  <Calendar
                    onChange={setValue}
                    value={value}
                    tileClassName={tileClassName}
                    className="w-full bg-transparent text-slate-900 dark:text-slate-200 border-0 shadow-none"
                  />
                </div>
              </div>
            </div>

            {/* Recent Workouts Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {t('Completed_Workouts')}
                  </h2>
                  {completedLogs.length > 0 && (
                    <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full font-medium">
                      {completedLogs.length} total
                    </span>
                  )}
                </div>

                {completedLogs.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {completedLogs.slice(0, 10).map((log, index) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-sm"></div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              {log.workout?.name || t('deleted_workout')}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Workout #{completedLogs.length - index}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {new Date(log.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {new Date(log.created_at).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      No completed workouts yet
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      {t('no_completed_workouts')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}