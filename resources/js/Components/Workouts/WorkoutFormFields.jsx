import React from 'react';
import MuscleGroupButton from '../Muscles/MuscleGroupButton';

export default function WorkoutFormFields({ data, setData, errors, muscleGroups, showFavorites, toggleMuscleGroup, toggleFavorites, t, displayMuscleGroup }) {
  return (
    <>
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

      <div>
        <label className="block text-gray-700 dark:text-gray-200">{t('description')}</label>
        <textarea
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
          className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 mb-2">{t('muscle_groups')}</label>
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <MuscleGroupButton
              key={group}
              group={group}
              isActive={data.muscle_groups.includes(group)}
              isFavorite={group === 'favorites'}
              toggle={() => (group === 'favorites' ? toggleFavorites() : toggleMuscleGroup(group))}
              displayName={displayMuscleGroup(group)}
            />
          ))}
        </div>
        {errors.muscle_groups && <p className="text-red-500 text-sm">{errors.muscle_groups}</p>}
      </div>
    </>
  );
}
