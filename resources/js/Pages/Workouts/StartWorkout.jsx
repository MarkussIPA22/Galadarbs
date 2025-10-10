import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/ResponsiveSidebar';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import ExerciseCard from '@/Components/Exercise/ExerciseCard';

export default function StartWorkout({ auth, workout, latest_log }) {
  const { t } = useTranslation();
  const [finished, setFinished] = useState(false);

  // Map previous exercises for reference
  const previousExercises = workout.exercises.map((ex) => {
    const prevEx = latest_log?.exercises?.find((p) => p.id === ex.id);
    return {
      id: ex.id,
      name: ex.name,
      muscle_group: ex.muscle_group,
      prevSets: prevEx?.sets || [],
    };
  });

  // Workout state
  const [exerciseData, setExerciseData] = useState(() =>
    workout.exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      muscle_group: ex.muscle_group,
      sets: ex.sets && ex.sets.length > 0 ? ex.sets : [{ reps: '', weight: '' }],
    }))
  );

  // Handlers for sets
  const handleSetChange = (exIndex, setIndex, field, value) => {
    const newData = [...exerciseData];
    newData[exIndex].sets[setIndex][field] = value;
    setExerciseData(newData);
  };

  const handleAddSet = (exIndex) => {
    const newData = [...exerciseData];
    newData[exIndex].sets.push({ reps: '', weight: '' });
    setExerciseData(newData);
  };

  const handleRemoveSet = (exIndex, setIndex) => {
    const newData = [...exerciseData];
    if (newData[exIndex].sets.length > 1) {
      newData[exIndex].sets.splice(setIndex, 1);
      setExerciseData(newData);
    }
  };

  // Save partially completed workout
  const handleSaveWorkout = (e) => {
    e.preventDefault();
    const workoutData = {
      workout_id: workout.id,
      exercises: exerciseData.map((ex) => ({
        id: ex.id,
        sets: ex.sets.map((s) => ({
          reps: parseInt(s.reps) || 0,
          weight: parseFloat(s.weight) || 0,
        })),
      })),
    };
      Inertia.post(route('workout-logs.store'), workoutData, {
  preserveState: true, // keeps the page state so finished = true works
  onSuccess: () => setFinished(true), // show download PDF button
});

  };

  // Finish workout and log it
 const handleFinishWorkout = () => {
  const workoutData = {
    workout_id: workout.id,
    exercises: exerciseData.map((ex) => ({
      id: ex.id,
      sets: ex.sets.map((s) => ({
        reps: parseInt(s.reps) || 0,
        weight: parseFloat(s.weight) || 0,
      })),
    })),
  };

  Inertia.post(route('workout-logs.store'), workoutData, {
    onSuccess: () => setFinished(true), // Now this will work
  });
};


  // Generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Workout: ${workout.name}`, 10, 20);
    exerciseData.forEach((ex, exIndex) => {
      doc.setFontSize(14);
      doc.text(`${exIndex + 1}. ${ex.name} (${ex.muscle_group})`, 10, 30 + exIndex * 30);
      (ex.sets || []).forEach((set, setIndex) => {
        doc.setFontSize(12);
        doc.text(
          `Set ${setIndex + 1}: ${set.reps} reps × ${set.weight} kg`,
          15,
          38 + exIndex * 30 + setIndex * 6
        );
      });
    });
    doc.save(`${workout.name.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Sidebar auth={auth} />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            {t('start_workout')}: {workout.name}
          </h1>

          <form onSubmit={handleSaveWorkout} className="space-y-4">
            {/* Exercise Cards */}
            {exerciseData.map((ex, exIndex) => {
              const prevEx = previousExercises.find((p) => p.id === ex.id);
              return (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  prevExercise={prevEx}
                  exIndex={exIndex}
                  handleSetChange={handleSetChange}
                  handleAddSet={handleAddSet}
                  handleRemoveSet={handleRemoveSet}
                  finished={finished}
                  t={t}
                />
              );
            })}

            {/* Action Buttons */}
            {/* Action Buttons */}
<div className="flex flex-wrap gap-4 mt-4">
  {/* Save Workout Button */}
  <button
    type="submit"
    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
  >
    {t('save_workout')}
  </button>

  {/* Download PDF Button (always visible) */}
  <button
    type="button"
    onClick={downloadPDF}
    className="px-6 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors"
  >
    {t('download_pdf')}
  </button>

  {/* Cancel Link */}
  <Link
    href={route('workouts.index')}
    className="px-6 py-2 bg-red-800 text-white rounded-xl hover:bg-red-900 transition-colors"
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
