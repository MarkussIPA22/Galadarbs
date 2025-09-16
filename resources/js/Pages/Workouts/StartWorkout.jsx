import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function StartWorkout({ auth, workout, latest_log }) {
  const { t } = useTranslation();

  // Prepare previous sets (just for display)
  const previousExercises = workout.exercises.map((ex) => {
    const prevEx = latest_log?.exercises?.find((p) => p.id === ex.id);
    return {
      id: ex.id,
      name: ex.name,
      muscle_group: ex.muscle_group,
      prevSets: prevEx?.sets || [], // read-only
    };
  });

  // Start new workout data with no sets
  const [exerciseData, setExerciseData] = useState(
    workout.exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      muscle_group: ex.muscle_group,
      sets: [{ reps: '', weight: '' }], // start fresh
    }))
  );

  const handleSetChange = (exIndex, setIndex, field, value) => {
    const newData = [...exerciseData];
    newData[exIndex].sets[setIndex][field] = value;
    setExerciseData(newData);
  };

  const handleAddSet = (exIndex) => {
    const newData = [...exerciseData];
    newData[exIndex].sets.push({ reps: '', weight: '' });
    setExerciseData(newData);
  };

  const handleRemoveSet = (exIndex, setIndex) => {
    const newData = [...exerciseData];
    if (newData[exIndex].sets.length > 1) {
      newData[exIndex].sets.splice(setIndex, 1);
      setExerciseData(newData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const workoutData = {
      workout_id: workout.id,
      exercises: exerciseData.map((ex) => ({
        id: ex.id,
        sets: ex.sets.map((s) => ({
          reps: parseInt(s.reps) || 0,
          weight: parseFloat(s.weight) || 0,
        })),
      })),
    };

    Inertia.post(route('workout-logs.store'), workoutData);
  };

  return (
    <AuthenticatedLayout>
      <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <Sidebar auth={auth} />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">
            {t('start_workout')}: {workout.name}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {exerciseData.map((ex, exIndex) => {
              const prevEx = previousExercises.find((p) => p.id === ex.id);

              return (
                <div key={ex.id} className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h2 className="font-semibold mb-4 text-lg">
                    {ex.name}{' '}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({ex.muscle_group})
                    </span>
                  </h2>

                  {prevEx?.prevSets?.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        {t('previous_workout')}
                      </h3>
                      {prevEx.prevSets.map((set, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded mb-2 text-sm"
                        >
                          <span>{t('set')} {idx + 1}</span>
                          <span>{set.reps} {t('reps')} @ {set.weight} kg</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Current workout sets (editable) */}
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {t('this_workout')}
                  </h3>
                  {ex.sets.map((set, setIndex) => (
                    <div
                      key={setIndex}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4"
                    >
                      <div className="text-center md:text-left">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {t('set')} {setIndex + 1}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('reps')}
                        </label>
                        <input
                          type="number"
                          min="0"
                          placeholder={t('reps')}
                          value={set.reps}
                          onChange={(e) =>
                            handleSetChange(exIndex, setIndex, 'reps', e.target.value)
                          }
                          className="w-full p-3 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {t('weight_kg')}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            placeholder={t('weight_kg')}
                            value={set.weight}
                            onChange={(e) =>
                              handleSetChange(exIndex, setIndex, 'weight', e.target.value)
                            }
                            className="w-full p-3 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                          />
                          {ex.sets.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveSet(exIndex, setIndex)}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                              title={t('remove_set')}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleAddSet(exIndex)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    + {t('add_set')}
                  </button>
                </div>
              );
            })}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('save_workout')}
              </button>
              <Link
                href={route('workouts.index')}
                className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
              >
                {t('cancel')}
              </Link>
            </div>
          </form>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
