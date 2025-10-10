import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import WorkoutFormFields from '@/Components/Workouts/WorkoutFormFields';
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                {t('edit_workout')}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Workout Form Fields */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8">
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
            </div>

            {/* Exercises Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('select_exercises')}</h2>
                <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    {data.exercises.length} {t('selected')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredExercises.map((exercise) => {
                  const isSelected = data.exercises.includes(exercise.id);
                  return (
                    <div
                      key={exercise.id}
                      onClick={() => toggleExercise(exercise.id)}
                      className={`group cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                        isSelected
                          ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 scale-[1.02]'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600 hover:scale-[1.02]'
                      }`}
                    >
                      {/* Image Container */}
                      <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden rounded-t-2xl">
                        {exercise.image_path ? (
                          <img
                            src={exercise.image_path}
                            alt={exercise.name}
                            className="max-w-full max-h-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <span className="text-5xl font-bold text-gray-400 dark:text-gray-600">
                            {exercise.name.charAt(0)}
                          </span>
                        )}

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Exercise Info */}
                      <div className="p-4">
                        <h3
                          className={`font-bold text-center mb-2 ${
                            isSelected ? 'text-emerald-900 dark:text-emerald-100' : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {exercise.name}
                        </h3>
                        <div className="flex items-center justify-center gap-1">
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              isSelected
                                ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {displayMuscleGroup(exercise.muscle_group.toLowerCase())}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredExercises.length === 0 && (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">{t('no_exercises_found')}</p>
                </div>
              )}
            </div>

            {/* Bottom Buttons */}
            <div className="bottom-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed"
                >
                  {processing ? t('saving') : t('save_changes')}
                </button>

                <button
                  type="button"
                  onClick={() => (window.location.href = route('workouts.start', workout.id))}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('start_workout')}
                </button>

                <Link
                  href={route('workouts.index')}
                  className="sm:flex-none px-8 py-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 rounded-2xl font-bold text-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {t('cancel')}
                </Link>
              </div>
            </div>
          </form>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
