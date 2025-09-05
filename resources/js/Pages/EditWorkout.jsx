import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/SideBar';

export default function EditWorkout({ auth, workout, exercises }) {
  const { data, setData, put, processing, errors } = useForm({
    name: workout.name || '',
    description: workout.description || '',
    muscle_groups: workout.muscle_groups || [],
    exercises: workout.exercises.map((e) => e.id) || [],
  });

  const [newMuscle, setNewMuscle] = useState('');

  const addMuscleGroup = () => {
    if (newMuscle.trim() && !data.muscle_groups.includes(newMuscle.trim())) {
      setData('muscle_groups', [...data.muscle_groups, newMuscle.trim()]);
      setNewMuscle('');
    }
  };

  const removeMuscleGroup = (muscle) => {
    setData('muscle_groups', data.muscle_groups.filter((m) => m !== muscle));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('workouts.update', workout.id));
  };

  const toggleExercise = (id) => {
    if (data.exercises.includes(id)) {
      setData('exercises', data.exercises.filter((exId) => exId !== id));
    } else {
      setData('exercises', [...data.exercises, id]);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        <Sidebar auth={auth} />

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Workout</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workout Name */}
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

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200">Description</label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* Muscle Groups */}
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
                <button type="button" onClick={addMuscleGroup} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Add
                </button>
              </div>
              <ul className="flex flex-wrap gap-2">
                {data.muscle_groups.map((muscle, index) => (
                  <li key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center gap-2">
                    {muscle}
                    <button type="button" onClick={() => removeMuscleGroup(muscle)} className="text-red-500 text-sm">
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exercises */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">Exercises</label>
              <div className="grid grid-cols-2 gap-2">
                {exercises.map((exercise) => (
                  <label key={exercise.id} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700">
                    <input
                      type="checkbox"
                      checked={data.exercises.includes(exercise.id)}
                      onChange={() => toggleExercise(exercise.id)}
                    />
                    {exercise.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button type="submit" disabled={processing} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
                Save Changes
              </button>

              <Link href={route('workouts.index')} className="px-6 py-2 bg-red-800 text-white rounded-lg">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
