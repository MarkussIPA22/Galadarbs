import { Link } from '@inertiajs/react';

export default function ExerciseCard({ exercise, selected, onToggle, displayMuscleGroup, t }) {
  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700 cursor-pointer">
      <input type="checkbox" checked={selected} onChange={onToggle} className="mb-1" />
      {exercise.image_path ? (
        <img
          src={exercise.image_path}
          alt={exercise.name}
          className="w-36 h-36 object-cover rounded"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xs">
          {t('no_image')}
        </div>
      )}
      <Link
        href={route('exercises.show', exercise.id)}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        {exercise.name}
      </Link>
      <span className="text-xs text-gray-500">
        {displayMuscleGroup(exercise.muscle_group.toLowerCase())}
      </span>
    </div>
  );
}
