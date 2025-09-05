import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function MyWorkouts({ auth }) {
  const { workouts } = usePage().props;

  return (
    <AuthenticatedLayout>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        {}
        <Sidebar auth={auth} />

        {}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">My Workouts</h1>
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
                      Muscle Groups: {workout.muscle_groups.join(', ')}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Link
                      href={route('workouts.edit', workout.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You havent created any workouts</p>
          )}
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
