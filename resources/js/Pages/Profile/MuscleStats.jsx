import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function MuscleStats({ auth, muscleCounts = {} }) {
  const { t } = useTranslation();

     const data = Object.entries(muscleCounts).map(([muscleKey, count]) => ({
  name: t(muscleKey.toLowerCase()), // <-- normalize to lowercase
  value: count,
}));
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#7fbfff', '#d17fff'];

  return (
    <AuthenticatedLayout
      user={auth}
      header={<h2 className="text-2xl font-bold">{t('most_trained_muscles')}</h2>}
    >
      <Head title={t('workout_stats')} />

      <div className="flex">
        <Sidebar auth={auth} className="w-64 mr-6" />

        <div className="flex-1 p-6 bg-white dark:bg-gray-900 rounded-xl ">
          <h3 className="text-lg font-semibold mb-4">{t('workout_stats')}</h3>

          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <div className="mt-6">
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
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
