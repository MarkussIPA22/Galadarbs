import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import ResponsiveSidebar from '@/Components/ResponsiveSidebar';

export default function Tasks({ exercises = [], auth }) {
  const { t, i18n } = useTranslation();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (exercises.length === 0) return;

    const storedTask = localStorage.getItem('weeklyTask');
    let savedTask = null;

    if (storedTask) {
      savedTask = JSON.parse(storedTask);
      const dueDate = new Date(savedTask.dueDate);
      const today = new Date();

      if (today > dueDate) {
        savedTask = null;
      }
    }

    if (!savedTask) {

      const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
      const startDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(startDate.getDate() + 7);

      savedTask = {
        exercise: randomExercise,
        target: Math.floor(Math.random() * (1000 - 500 + 1)) + 500,
        startDate: startDate.toISOString(),
        dueDate: dueDate.toISOString(),
        completed: false,
      };

      localStorage.setItem('weeklyTask', JSON.stringify(savedTask));
    }

    setTask(savedTask);
  }, [exercises]);

  if (!task) {
    return (
      <AuthenticatedLayout auth={auth}>
        <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
          <ResponsiveSidebar auth={auth} />
          <main className="flex-1 p-6 max-w-6xl mx-auto text-center">
            <p className="text-gray-500 dark:text-gray-400">{t('loading_task')}...</p>
          </main>
        </div>
      </AuthenticatedLayout>
    );
  }

  const exerciseName = i18n.language === 'lv' ? task.exercise.name_lv || task.exercise.name : task.exercise.name;
  const exerciseMuscle = i18n.language === 'lv' ? task.exercise.muscle_group_lv || task.exercise.muscle_group : task.exercise.muscle_group;

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <ResponsiveSidebar auth={auth} />
        <main className="flex-1 p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">{t('your_task_for_this_week')}</h1>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{exerciseName}</h2>
           
            <p className="mb-2">
              {t('target')}: <span className="font-medium">{task.target} kg</span>
            </p>
            <p className="mb-2">
              {t('start_date')}: {new Date(task.startDate).toLocaleDateString()}
            </p>
            <p className="mb-4">
              {t('due_date')}: {new Date(task.dueDate).toLocaleDateString()}
            </p>

            {task.completed ? (
              <span className="inline-block mt-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                ✅ {t('completed')}
              </span>
            ) : (
              <span className="inline-block mt-2 text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                 {t('in_progress')}
              </span>
            )}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
