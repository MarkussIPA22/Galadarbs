import React from 'react';
import { Link } from '@inertiajs/react';

// Tiek importēta AuthenticatedLayout komponente
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// Tiek importēta Sidebar komponente
import Sidebar from '@/Components/Sidebar';
// Tiek importēta useTranslation no react-i18next
import { useTranslation } from 'react-i18next'; 

export default function Index({ auth, exercises = [] }) {
  const { t } = useTranslation(); 

  return (
    // Tiek izsaukta AuthenticatedLayout komponente
    <AuthenticatedLayout>
      {/* Flex container for sidebar + main content */}
      <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        {/* Tiek izsaukts Sidebar, flex-shrink-0 prevents collapsing */}
        <Sidebar auth={auth} className="flex-shrink-0" /> 

        <main className="flex-1 p-6 overflow-x-auto">
          <h1 className="text-2xl font-bold mb-6">{t('exercises')}</h1> 

          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                    {t('exercise_name')} 
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                    {t('muscle_groups')} 
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                    {t('actions')} 
                  </th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise) => (
                  <tr key={exercise.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{exercise.name} {exercise.name.lv}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{exercise.muscle_group}</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                      <Link
                        href={route('exercises.show', exercise.id)}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {t('view')} 
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
