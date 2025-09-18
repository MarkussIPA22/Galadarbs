import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function EditWorkout({ auth, workout, exercises, favoriteExercises }) {
  const { t } = useTranslation();
  const { data, setData, put, processing, errors } = useForm({
    name: workout.name || '',
    description: workout.description || '',
    muscle_groups: workout.muscle_groups || [],
    exercises: workout.exercises.map((e) => e.id) || [],
  });

  const [filter, setFilter] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const muscleGroups = [
    ...new Set(exercises.map((e) => e.muscle_group.toLowerCase())),
    'favorites'
  ];

  const displayMuscleGroup = (group) => group === 'favorites' ? t('favorites') : t(group);

  const toggleMuscleGroup = (group) => {
    if (data.muscle_groups.includes(group)) {
      setData('muscle_groups', data.muscle_groups.filter(m => m !== group));
    } else {
      setData('muscle_groups', [...data.muscle_groups, group]);
    }
  };

  const toggleExercise = (id) => {
    if (data.exercises.includes(id)) {
      setData('exercises', data.exercises.filter(exId => exId !== id));
    } else {
      setData('exercises', [...data.exercises, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('workouts.update', workout.id));
  };

  const filteredExercises = exercises.filter((exercise) => {
    const isFavorite = favoriteExercises.includes(exercise.id);
    const matchesFavorites = showFavorites && isFavorite;
    const matchesMuscleGroup = data.muscle_groups.includes(exercise.muscle_group.toLowerCase());
    const matchesFilter = filter ? exercise.muscle_group.toLowerCase() === filter : true;
    return (matchesFavorites || matchesMuscleGroup) && matchesFilter;
  });

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        <Sidebar auth={auth} />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{t('edit_workout')}</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200">{t('workout_name')}</label>
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
              <label className="block text-gray-700 dark:text-gray-200">{t('description')}</label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* Muscle Groups + Favorites */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">{t('muscle_groups')}</label>
              <div className="flex flex-wrap gap-2">
                {muscleGroups.map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => {
                      if (group === 'favorites') setShowFavorites(!showFavorites);
                      else toggleMuscleGroup(group);
                    }}
                    className={`px-3 py-1 rounded-full border ${
                      group === 'favorites'
                        ? showFavorites ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-400'
                        : data.muscle_groups.includes(group) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-400'
                    }`}
                  >
                    {displayMuscleGroup(group)}
                  </button>
                ))}
              </div>
              {errors.muscle_groups && <p className="text-red-500 text-sm">{errors.muscle_groups}</p>}
            </div>

            {/* Filter */}
            {data.muscle_groups.length > 1 && (
              <div className="mb-2">
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">{t('muscle_groups')} ({t('exercises')})</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="">{t('all')}</option>
                  {data.muscle_groups.map((group) => (
                    <option key={group} value={group}>{displayMuscleGroup(group)}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Exercises Grid */}
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-2">{t('exercises')}</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredExercises.map((exercise) => (
                  <div key={exercise.id} className="flex flex-col items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700">
                    <input type="checkbox" checked={data.exercises.includes(exercise.id)} onChange={() => toggleExercise(exercise.id)} className="mb-1" />
                    {exercise.image_path ? (
                      <img src={exercise.image_path} alt={exercise.name} className="w-36 h-36 object-cover rounded" />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xs">{t('no_image')}</div>
                    )}
                    <Link href={route('exercises.show', exercise.id)} className="text-sm font-medium text-blue-600 hover:underline">{exercise.name}</Link>
                    <span className="text-xs text-gray-500">{displayMuscleGroup(exercise.muscle_group.toLowerCase())}</span>
                  </div>
                ))}
              </div>
              {errors.exercises && <p className="text-red-500 text-sm">{errors.exercises}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button type="submit" disabled={processing} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">{t('save_changes')}</button>
              <button type="button" onClick={() => (window.location.href = route('workouts.start', workout.id))} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('start_workout')}</button>
              <Link href={route('workouts.index')} className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900">{t('cancel')}</Link>
            </div>
          </form>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
