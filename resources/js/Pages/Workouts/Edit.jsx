import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import WorkoutFormFields from '@/Components/Workouts/WorkoutFormFields';
import ExercisesSelector from '@/Components/Exercise/ExercisesSelector';
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

  const muscleGroups = [...new Set(exercises.map((e) => e.muscle_group.toLowerCase())), 'favorites'];
  const displayMuscleGroup = (group) => group === 'favorites' ? t('favorites') : t(group);

  const toggleMuscleGroup = (group) => {
    if (data.muscle_groups.includes(group)) {
      setData('muscle_groups', data.muscle_groups.filter((m) => m !== group));
    } else {
      setData('muscle_groups', [...data.muscle_groups, group]);
    }
  };

  const toggleFavorites = () => setShowFavorites(!showFavorites);

  const toggleExercise = (id) => {
    if (data.exercises.includes(id)) {
      setData('exercises', data.exercises.filter((exId) => exId !== id));
    } else {
      setData('exercises', [...data.exercises, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('workouts.update', workout.id), {
      onError: (err) => console.log('Backend validation errors:', err),
      onSuccess: (res) => console.log('Update response:', res),
    });
  };

  const filteredExercises = exercises.filter((exercise) => {
    const isFavorite = favoriteExercises.includes(exercise.id);
    const matchesFavorites = showFavorites && isFavorite;

    const matchesFilter = filter === '' ? true : exercise.muscle_group.toLowerCase() === filter;
    const matchesMuscleGroups = data.muscle_groups.length === 0
      ? true
      : data.muscle_groups.includes(exercise.muscle_group.toLowerCase());

    return (matchesFavorites || matchesMuscleGroups) && matchesFilter;
  });

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
        <Sidebar auth={auth} />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{t('edit_workout')}</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <WorkoutFormFields
              data={data}
              setData={setData}
              errors={errors}
              muscleGroups={muscleGroups}
              showFavorites={showFavorites}
              toggleMuscleGroup={toggleMuscleGroup}
              toggleFavorites={toggleFavorites}
              t={t}
              displayMuscleGroup={displayMuscleGroup}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  onClick={() => toggleExercise(exercise.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                    data.exercises.includes(exercise.id)
                      ? 'border-emerald-500 shadow-lg bg-emerald-50 dark:bg-emerald-900'
                      : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md'
                  }`}
                >
                 <div className="w-full h-32 mb-2 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
  {exercise.image_path ? (
    <img
      src={exercise.image_path}  
      alt={exercise.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white font-bold text-xl">
      {exercise.name.charAt(0)}
    </span>
  )}
</div>


                  <h3 className="text-center font-semibold text-gray-900 dark:text-white">
                    {exercise.name}
                  </h3>

                 
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {displayMuscleGroup(exercise.muscle_group.toLowerCase())}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {t('save_changes')}
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = route('workouts.start', workout.id))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t('start_workout')}
              </button>

              <Link
                href={route('workouts.index')}
                className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900"
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
