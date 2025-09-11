import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function StartWorkout({ auth, workout, latest_log }) {
  // Initialize exercise data with previous workout results if available
  const [exerciseData, setExerciseData] = useState(
    workout.exercises.map((ex) => {
      // Find the exercise in the latest log
      const prevEx = latest_log?.exercises?.find((p) => p.id === ex.id);

      return {
        id: ex.id,
        name: ex.name,
        muscle_group: ex.muscle_group,
        sets: prevEx?.sets?.length
          ? prevEx.sets.map((s, index) => ({
              reps: s.reps?.toString() || '',
              weight: s.weight?.toString() || '',
              label: `Previous workout: Set ${index + 1}`, // optional label
            }))
          : [{ reps: '', weight: '' }],
      };
    })
  );

  const handleSetChange = (exIndex, setIndex, field, value) => {
    const newData = [...exerciseData];
    newData[exIndex].sets[setIndex][field] = value; // keep as string for input
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
          <h1 className="text-2xl font-bold mb-6">Start Workout: {workout.name}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {exerciseData.map((ex, exIndex) => (
              <div
                key={ex.id}
                className="p-6  dark:bg-gray-900 "
              >
                <h2 className="font-semibold mb-4 text-lg">
                  {ex.name}{' '}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({ex.muscle_group})
                  </span>
                </h2>

                {ex.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4 p-2  dark:bg-gray-900 rounded"
                  >
                    <div className="text-center md:text-left">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Set {setIndex + 1}
                      </span>
                      {set.label && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {set.label}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Reps
                      </label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Reps"
                        value={set.reps}
                        onChange={(e) =>
                          handleSetChange(exIndex, setIndex, 'reps', e.target.value)
                        }
                        className="w-full p-3 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Weight (kg)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          placeholder="Weight"
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
                            title="Remove set"
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
                  + Add Set
                </button>
              </div>
            ))}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Workout
              </button>
              <Link
                href={route('workouts.index')}
                className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
