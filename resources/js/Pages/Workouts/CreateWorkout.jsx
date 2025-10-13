import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import SubmitButton from '@/Components/Workouts/SubmitButton';
import MuscleGroupButton from '@/Components/Muscles/MuscleGroupButton';
import ResponsiveSidebar from '@/Components/ResponsiveSidebar';

export default function CreateWorkout({ auth }) {
  const { t } = useTranslation();

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    muscle_groups: [], 
  });

  const [showFavorites, setShowFavorites] = useState(false);

  const muscleOptions = [
    'chest',
    'back',
    'shoulders',
    'biceps',
    'triceps',
    'legs',
    'abs',
    'full body',
  ];

  const toggleMuscleGroup = (group) => {
    const groups = data.muscle_groups || [];
    if (groups.includes(group)) {
      setData('muscle_groups', groups.filter((m) => m !== group));
    } else {
      setData('muscle_groups', [...groups, group]);
    }
  };

  const toggleFavorites = () => setShowFavorites(!showFavorites);

  const submit = (e) => {
    e.preventDefault();
    post(route('workouts.store'));
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <Head title={t('create_workout')} />

      <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="w-full md:w-64 flex-shrink-0">
          <ResponsiveSidebar auth={auth} />
        </div>

        <main className="flex-1 p-6 lg:p-8 overflow-hidden">
          <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
            <h2 className="text-2xl font-bold text-emerald-500 dark:text-white mb-6">
              {t('create_new_workout')}
            </h2>

            <form onSubmit={submit} className="flex flex-col gap-4">
            
              <div>
                <label className="block text-gray-700 dark:text-gray-200">
                  {t('workout_name')}
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{t('workout_name_required')}</p>
                )}
              </div>

            
              <div>
                <label className="block text-gray-700 dark:text-gray-200">
                  {t('description')}
                </label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{t('description_required')}</p>
                )}
              </div>

              
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-2">
                  {t('muscle_groups')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {muscleOptions.map((muscle) => (
                    <MuscleGroupButton
                      key={muscle}
                      group={muscle}
                      isActive={(data.muscle_groups || []).includes(muscle)}
                      isFavorite={muscle === 'favorites'}
                      toggle={() =>
                        muscle === 'favorites' ? toggleFavorites() : toggleMuscleGroup(muscle)
                      }
                      displayName={t(muscle.toLowerCase())}
                    />
                  ))}
                </div>
                {errors.muscle_groups && (
                  <p className="text-red-500 text-sm">{errors.muscle_groups}</p>
                )}
              </div>

              <SubmitButton processing={processing} label={t('create_workout')} />
            </form>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
