import React from 'react';

export default function MuscleGroupButton({ group, isActive, isFavorite, toggle, displayName }) {
  const classes = isFavorite
    ? isActive
      ? 'bg-yellow-500 text-white border-yellow-500'
      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-400'
    : isActive
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-400';

  return (
    <button
      type="button"
      onClick={toggle}
      className={`px-3 py-1 rounded-full border ${classes}`}
    >
      {displayName}
    </button>
  );
}
