import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function MyWorkouts({ auth }) {
  const { t } = useTranslation();
  const { workouts } = usePage().props;

  const handleDelete = (id) => {
    if (confirm(t('confirm_delete'))) {
      router.delete(route('workouts.destroy', id));
    }
  };

  const getMuscleGroupColor = (index) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    ];
    return colors[index % colors.length];
  };

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors">
       
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar auth={auth} />
        </div>

      
        <main className="flex-1 p-6 lg:p-8">

        
          <div className="bg-white  dark:bg-slate-800/70 rounded-2xl shadow-xl  p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                 
                Your Workouts
              </h2>
              {workouts.length > 0 && (
                <span className="text-sm text-slate-500 dark:text-slate-400  dark:bg-slate-700 px-3 py-1 rounded-full font-medium">
                  {workouts.length} workout{workouts.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {workouts.length > 0 ? (
              <div className="space-y-4">
                {workouts.map((workout, index) => (
                  <div
                    key={workout.id}
                    className="group p-6 bg-white dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                              {workout.name}
                            </h3>
                            {workout.description && (
                              <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                                {workout.description}
                              </p>
                            )}
                            {workout.muscle_groups && workout.muscle_groups.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-2">
                                  {t('muscle_groups')}:
                                </span>
                                {workout.muscle_groups.map((group, groupIndex) => (
                                  <span
                                    key={groupIndex}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getMuscleGroupColor(groupIndex)}`}
                                  >
                                    {group}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Created {new Date(workout.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 lg:ml-4">
                        <Link
                          href={route('workouts.start', workout.id)}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium"
                        >
                          
                          <span>{t('Start_Workout')}</span>
                        </Link>

                        <Link
                          href={route('workouts.edit', workout.id)}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium"
                        >
                         
                          <span>{t('edit')}</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(workout.id)}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium"
                        >
                         
                          <span>{t('delete')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                 
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  No workouts created yet
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  {t('no_workouts_yet')}. Start building your fitness routine by creating your first workout plan.
                </p>
                <Link
                  href={route('workouts.create')}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
                >
                 
                  <span>Create Your First Workout</span>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}