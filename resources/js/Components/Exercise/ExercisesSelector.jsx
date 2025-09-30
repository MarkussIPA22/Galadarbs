import React from 'react';
import ExerciseCard from './ExerciseCard';

export default function ExercisesSelector({ exercises, data, toggleExercise, filteredExercises, t, displayMuscleGroup }) {
  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-200 mb-2">{t('exercises')}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            selected={data.exercises.includes(exercise.id)}
            onToggle={() => toggleExercise(exercise.id)}
            t={t}
            displayMuscleGroup={displayMuscleGroup}
          />
        ))}
      </div>
    </div>
  );
}
