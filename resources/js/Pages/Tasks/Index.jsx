import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function Tasks({ tasks = [], exercises = [], auth }) {
  const { t } = useTranslation();
  const { data, setData, post, processing } = useForm({
    exercise_id: exercises.length > 0 ? exercises[0].id : '',
    target: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Create new task
  const handleCreateTask = (e) => {
    e.preventDefault();
    post(route('tasks.store'), {
      onSuccess: () =>
        setData({
          exercise_id: exercises.length > 0 ? exercises[0].id : '',
          target: '',
          date: new Date().toISOString().split('T')[0],
        }),
    });
  };

  const handleRandomTask = () => {
    if (exercises.length === 0) return;

    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
    const randomTarget = Math.floor(Math.random() * 201) + 100; // 100kg to 300kg
    setData({
      ...data,
      exercise_id: randomExercise.id,
      target: randomTarget,
    });
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <Sidebar auth={auth} />

        <main className="flex-1 p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
            {t('tasks')}
          </h1>

        
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={handleRandomTask}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
            >
              {t('random_task')}
            </button>
          </div>

          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {t('create_new_task')}
            </h2>
            <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={data.exercise_id}
                onChange={(e) => setData('exercise_id', e.target.value)}
                required
                className="border p-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700"
              >
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder={t('target_kg')}
                value={data.target}
                onChange={(e) => setData('target', e.target.value)}
                className="border p-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700"
                min="1"
                required
              />

              <input
                type="date"
                value={data.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setData('date', e.target.value)}
                className="border p-2 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700"
                required
              />

              <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition disabled:opacity-50"
              >
                {t('create')}
              </button>
            </form>
          </div>

        
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-gray-500 italic text-center py-6 border border-dashed rounded-lg">
                {t('no_tasks_for_today')}
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                      {task.exercise?.name ?? t('unnamed_exercise')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('progress')}: <span className="font-medium">{task.progress}</span> / {task.target} kg
                    </p>
                    {task.completed && (
                      <span className="inline-block mt-2 text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                        ✅ {t('completed')}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
