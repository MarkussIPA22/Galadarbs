import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import ResponsiveSidebar from '@/Components/ResponsiveSidebar';

export default function MuscleStats({ auth, muscleCounts = {} }) {
  const { t } = useTranslation();

  const data = Object.entries(muscleCounts).map(([muscleKey, count]) => ({
    name: t(muscleKey.toLowerCase()),
    value: count,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#7fbfff', '#d17fff'];

  return (
    <AuthenticatedLayout
      user={auth}
      header={<h2 className="text-2xl font-bold">{t('most_trained_muscles')}</h2>}
    >
      <Head title={t('workout_stats')} />

      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <ResponsiveSidebar auth={auth} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">{t('workout_stats')}</h3>

          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
            <h4 className="font-bold mb-2">{t('muscle_groups')}</h4>
            <ul className="space-y-2">
              {data.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
