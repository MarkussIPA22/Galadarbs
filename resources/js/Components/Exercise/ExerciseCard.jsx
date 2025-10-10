import React from 'react';
import PreviousSets from '@/Components/Workouts/PreviousSets';
import { useTranslation } from 'react-i18next';

export default function ExerciseCard({
  exercise,
  prevExercise,
  exIndex,
  handleSetChange,
  handleAddSet,
  handleRemoveSet,
  finished,
  t
  
}) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
        {exercise.name}
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
          ({exercise.muscle_group})
        </span>
      </h2>

      <PreviousSets prevSets={prevExercise?.prevSets} t={t} />

      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        {t('this_workout')}
      </h3>

      {(exercise.sets || []).map((set, setIndex) => (
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
            <label className="text-sm  font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('reps')}
            </label>
            <input
              type="number"
              min="0"
              value={set.reps}
              onChange={(e) =>
                handleSetChange(exIndex, setIndex, 'reps', e.target.value)
                
              }
              placeholder={t('Enter_your_reps')}
              className="w-full p-3 text-center border border-gray-300 dark:border-gray-600 rounded bg-gray-400 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              disabled={finished}
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
                value={set.weight}
                onChange={(e) =>
                  handleSetChange(exIndex, setIndex, 'weight', e.target.value)
                }
                placeholder={t('Enter_your_weight')}
                className="w-full p-3 text-center border border-gray-300 dark:border-gray-600 rounded bg-gray-400 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                disabled={finished}
              />
              {exercise.sets.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSet(exIndex, setIndex)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  title={t('remove_set')}
                  disabled={finished}
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
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
        disabled={finished}
      >
        + {t('add_set')}
      </button>
    </div>
  );
}
