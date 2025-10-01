import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import SetsList from '@/Components/Workouts/SetList';

export default function ShowWorkout({ auth, workout, latest_log }) {
  return (
    <AuthenticatedLayout auth={auth} header={`${workout?.name || 'Workout'}`}>
      <Head title={workout?.name || 'Workout'} />

      <div className="flex min-h-screen">
        <Sidebar auth={auth} />

        <div className="flex-1 p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6">{workout?.name || 'Unknown Workout'}</h1>
          <p className="text-slate-500 mb-6">{workout?.description || 'No description available.'}</p>

          <div className="space-y-6">
            {latest_log?.exercises?.length > 0 ? (
              latest_log.exercises.map((exercise, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-lg shadow">
                  {/* Make exercise name a clickable link */}
                  <h2 className="text-xl font-semibold">
                    <Link
                      href={route('exercises.show', exercise.id)}
                      className="text-indigo-500 hover:underline"
                    >
                      {exercise.name || 'Unknown Exercise'}
                      {exercise.name_lv ? ` / ${exercise.name_lv}` : ''}
                    </Link>
                  </h2>
                  <p className="text-sm text-slate-400">
                    {exercise.muscle_group || 'Unknown Muscle Group'}
                    {exercise.muscle_group_lv ? ` / ${exercise.muscle_group_lv}` : ''}
                  </p>

                  <div className="mt-2 space-y-1">
                    <SetsList sets={exercise.sets} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No exercises completed in this log yet.</p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
