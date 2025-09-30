import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import PreviousSets from '@/Components/Workouts/PreviousSets';
import ExerciseCard from '@/Components/Exercise/ExerciseCards';


export default function StartWorkout({ auth, workout, latest_log }) {
  const { t } = useTranslation();
  const [finished, setFinished] = useState(false);

  const previousExercises = workout.exercises.map((ex) => {
    const prevEx = latest_log?.exercises?.find((p) => p.id === ex.id);
    return {
      id: ex.id,
      name: ex.name,
      muscle_group: ex.muscle_group,
      prevSets: prevEx?.sets || [],
    };
  });

  const [exerciseData, setExerciseData] = useState(
    workout.exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      muscle_group: ex.muscle_group,
      sets: [{ reps: '', weight: '' }],
    }))
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const workoutData = {
      workout_id: workout.id,
      exercises: exerciseData.map((ex) => ({
        id: ex.id,
        sets: ex.sets.map((s) => ({ reps: parseInt(s.reps) || 0, weight: parseFloat(s.weight) || 0 })),
      })),
    };
    Inertia.post(route('workout-logs.store'), workoutData);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Workout: ${workout.name}`, 10, 20);
    exerciseData.forEach((ex, exIndex) => {
      doc.setFontSize(14);
      doc.text(`${exIndex + 1}. ${ex.name} (${ex.muscle_group})`, 10, 30 + exIndex * 30);
      ex.sets.forEach((set, setIndex) => {
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
      <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <Sidebar auth={auth} />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{t('start_workout')}: {workout.name}</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
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

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                disabled={finished}
              >
                {t('save_workout')}
              </button>

              <Link
                href={route('workouts.index')}
                className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
                disabled={finished}
              >
                {t('cancel')}
              </Link>

              {!finished && (
                <button
                  type="button"
                  onClick={() => setFinished(true)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {t('finish_workout')}
                </button>
              )}

              {finished && (
                <>
                  <span className="px-6 py-2 bg-gray-500 text-white rounded-lg">{t('workout_finished')}</span>
                  <button
                    type="button"
                    onClick={downloadPDF}
                    className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    {t('download_pdf')}
                  </button>
                </>
              )}
            </div>
          </form>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
