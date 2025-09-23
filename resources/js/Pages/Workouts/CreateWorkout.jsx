import Sidebar from '@/Components/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function CreateWorkout({ auth }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        muscle_groups: [],
    });

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setData('muscle_groups', [...data.muscle_groups, value]);
        } else {
            setData('muscle_groups', data.muscle_groups.filter(m => m !== value));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('workouts.store'));
    };

    const muscleOptions = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Abs', 'Full Body'];

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t('create_workout')} />

            <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-gray-900 transition-colors">
                <div className="w-full md:w-64 flex-shrink-0">
                    <Sidebar auth={auth} />
                </div>

                <main className="flex-1 p-6 lg:p-8 overflow-hidden">
                    <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                        <h2 className="text-2xl font-bold text-emerald-500 dark:text-white mb-6">
                            {t('create_new_workout')}
                        </h2>

                        <form onSubmit={submit} className="flex flex-col gap-4">
                          
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder={t('workout_name')}
                                className="border border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-white/80 dark:bg-slate-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-colors"
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}

                         
                            <div className="flex flex-col gap-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">{t('muscle_groups')}:</span>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {muscleOptions.map((muscle) => (
                                        <label key={muscle} className="flex items-center gap-2 p-2 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600 cursor-pointer hover:shadow-md transition-all duration-200">
                                            <input
                                                type="checkbox"
                                                value={muscle.toLowerCase()}
                                                onChange={handleCheckboxChange}
                                                checked={data.muscle_groups.includes(muscle.toLowerCase())}
                                                className="form-checkbox w-5 h-5 text-emerald-500"
                                            />
                                            <span className="text-gray-900 dark:text-gray-200">{t(muscle.toLowerCase())}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {errors.muscle_groups && <p className="text-red-500">{errors.muscle_groups}</p>}

                         
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder={t('workout_description')}
                                className="border border-gray-300 dark:border-gray-600 p-3 rounded-xl bg-white/80 dark:bg-slate-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-colors"
                                rows={5}
                            />

                           
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
                            >
                                {t('create_workout')}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
