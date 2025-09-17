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

  return (
    <AuthenticatedLayout>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        {/* Sidebar */}
        <Sidebar auth={auth} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">{t('my_workouts')}</h1>

          {workouts.length > 0 ? (
            <ul className="space-y-4">
              {workouts.map((workout) => (
                <li
                  key={workout.id}
                  className="p-4 border rounded-lg shadow flex justify-between items-start dark:border-gray-700"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{workout.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{workout.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('muscle_groups')}: {workout.muscle_groups.join(', ')}
                    </p>
                  </div>

                  <div className="ml-4 flex gap-2">

                      <Link
                      href={route('workouts.start', workout.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      {t('Start Workout')}
                    </Link>

                    <Link
                      href={route('workouts.edit', workout.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {t('edit')}
                    </Link>

                    <button
                      onClick={() => handleDelete(workout.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      {t('delete')}
                    </button>

                   
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t('no_workouts_yet')}</p>
          )}
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
