import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function MyWorkouts({ auth }) {
  const { workouts } = usePage().props;

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this workout?')) {
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

                  <div className="ml-4 flex gap-2">
                    <Link
                      href={route('workouts.edit', workout.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(workout.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven’t created any workouts yet.</p>
          )}
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
