import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Index({ auth, unfinishedWorkouts }) {
  const { t } = useTranslation();

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={t('notifications')} />

      <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
       
        <Sidebar auth={auth} />

        <main className="flex-1 p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{t('notifications')}</h1>

          {unfinishedWorkouts.length > 0 ? (
            <div className="space-y-3">
              {unfinishedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="p-4 rounded-lg bg-yellow-100 border border-yellow-300 text-yellow-800"
                >
                  <p>
                     {t('You havent finished a workout')}:{" "}
                    <span className="font-semibold">
                      {workout.workout?.name ?? t('unnamed_workout')}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-green-100 text-green-700 rounded">
               {t('no_unfinished_workouts')}
            </div>
          )}
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
