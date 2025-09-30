import React from 'react';

export default function PreviousSets({ prevSets, t }) {
  if (!prevSets?.length) return null;

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        {t('previous_workout')}
      </h3>
      {prevSets.map((set, idx) => (
        <div
          key={idx}
          className="flex justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded mb-2 text-sm"
        >
          <span>{t('set')} {idx + 1}</span>
          <span>{set.reps} {t('reps')} @ {set.weight} kg</span>
        </div>
      ))}
    </div>
  );
}
