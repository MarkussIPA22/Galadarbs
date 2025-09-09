import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function EditWorkout({ auth, workout, exercises }) {
  const { data, setData, put, processing, errors } = useForm({
    name: workout.name || '',
    description: workout.description || '',
    muscle_groups: workout.muscle_groups || [],
    exercises: workout.exercises.map((e) => e.id) || [],
  });

  const [newMuscle, setNewMuscle] = useState('');
  const [filter, setFilter] = useState(''); // muscle group filter

  const muscleGroups = ['Back', 'Chest', 'Biceps', 'Triceps', 'Shoulders', 'Legs', 'Abs', ];

  const addMuscleGroup = () => {
    const trimmed = newMuscle.trim();
    if (trimmed && !data.muscle_groups.includes(trimmed)) {
      setData('muscle_groups', [...data.muscle_groups, trimmed]);
      setNewMuscle('');
    }
  };

  const removeMuscleGroup = (muscle) => {
    setData('muscle_groups', data.muscle_groups.filter((m) => m !== muscle));
  };

  const toggleExercise = (id) => {
    if (data.exercises.includes(id)) {
      setData('exercises', data.exercises.filter((exId) => exId !== id));
    } else {
      setData('exercises', [...data.exercises, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('workouts.update', workout.id));
  };

  // Filter exercises based on the selected muscle group
  const filteredExercises = filter
    ? exercises.filter((exercise) => exercise.muscle_group.toLowerCase() === filter.toLowerCase())
    : exercises;

  return (
    <AuthenticatedLayout>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        <Sidebar auth={auth} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Workout</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-200">Workout Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

        
            <div>
              <label className="block text-gray-700 dark:text-gray-200">Description</label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

         
            <div>
              <label className="block text-gray-700 dark:text-gray-200">Muscle Groups</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newMuscle}
                  onChange={(e) => setNewMuscle(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                  placeholder="Add muscle group"
                />
                <button
                  type="button"
                  onClick={addMuscleGroup}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <ul className="flex flex-wrap gap-2">
                {data.muscle_groups.map((muscle, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center gap-2"
                  >
                    {muscle}
                    <button
                      type="button"
                      onClick={() => removeMuscleGroup(muscle)}
                      className="text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              {errors.muscle_groups && <p className="text-red-500 text-sm">{errors.muscle_groups}</p>}
            </div>

          
            <div className="mb-2">
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                Filter Exercises by Muscle Group
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">All</option>
                {muscleGroups.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

          
          
<div>
  <label className="block text-gray-700 dark:text-gray-200 mb-2">Exercises</label>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {filteredExercises.map((exercise) => (
      <label
        key={exercise.id}
        className="flex flex-col items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700"
      >
        <input
          type="checkbox"
          checked={data.exercises.includes(exercise.id)}
          onChange={() => toggleExercise(exercise.id)}
          className="mb-1"
        />
        {exercise.image_path ? (
          <img
            src={`/storage/${exercise.image_path}`}
            alt={exercise.name}
            className="w-36 -36 object-cover rounded"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xs">
            No Image
          </div>
        )}
        <span className="text-sm">{exercise.name}</span>
        <span className="text-xs text-gray-500">{exercise.muscle_group}</span>
      </label>
    ))}
  </div>
  {errors.exercises && <p className="text-red-500 text-sm">{errors.exercises}</p>}
</div>


       
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Save Changes
              </button>

            <div className="flex justify-end mt-6 gap-4">
          <button
         type="button"
         onClick={() => window.location.href = route('workouts.start', workout.id)}
         className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
     Start Workout
    </button>
    </div>

              <Link
                href={route('workouts.index')}
                className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900"
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
