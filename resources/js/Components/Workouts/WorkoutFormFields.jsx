import React from 'react';
import MuscleGroupButton from '../Muscles/MuscleGroupButton';

export default function WorkoutFormFields({
  data,
  setData,
  errors,
  muscleGroups,
  showFavorites,
  toggleMuscleGroup,
  toggleFavorites,
  t,
  displayMuscleGroup
}) {
  return (
    <div className="space-y-8">
      <div className="group">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wider">
          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {t('workout_name')}
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder={t('enter_workout_name')}
            className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20'
            }`}
          />
          {data.name && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        {errors.name && (
          <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 animate-in slide-in-from-top-1 duration-200">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{errors.name}</p>
          </div>
        )}
      </div>

      <div className="group">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 uppercase tracking-wider">
          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          {t('description')}
          <span className="text-xs text-gray-500 dark:text-gray-400 normal-case font-normal">
            ({t('optional')})
          </span>
        </label>
        <div className="relative">
          <textarea
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          
            rows="4"
            className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 resize-none ${
              errors.description
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/20'
            }`}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
            {data.description?.length || 0} {t('characters')}
          </div>
        </div>
        {errors.description && (
          <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 animate-in slide-in-from-top-1 duration-200">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{errors.description}</p>
          </div>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-wider">
          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {t('muscle_groups')}
          {data.muscle_groups.length > 0 && (
            <span className="ml-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
              {data.muscle_groups.length} {t('selected')}
            </span>
          )}
        </label>

        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-3">
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

          {data.muscle_groups.length === 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              
            </div>
          )}
        </div>

        {errors.muscle_groups && (
          <div className="flex items-center gap-2 mt-3 text-red-600 dark:text-red-400 animate-in slide-in-from-top-1 duration-200">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{errors.muscle_groups}</p>
          </div>
        )}
      </div>
    </div>
  );
}