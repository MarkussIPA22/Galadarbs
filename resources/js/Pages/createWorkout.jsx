import Sidebar from '@/Components/SideBar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function CreateWorkout({ auth }) {
    const { t } = useTranslation(); // <-- add translation hook
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

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <Sidebar auth={auth} />

                <main className="flex-1 p-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            {t('create_new_workout')}
                        </h2>

                        <form onSubmit={submit} className="flex flex-col gap-4">
                           
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder={t('workout_name')}
                                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
                            />
                            {errors.name && <p className="text-red-500">{errors.name}</p>}

                         
                            <div className="flex flex-col gap-2">
                                <span className="font-medium">{t('muscle_groups')}:</span>
                                {muscleOptions.map((muscle) => (
                                    <label key={muscle} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value={muscle.toLowerCase()}
                                            onChange={handleCheckboxChange}
                                            checked={data.muscle_groups.includes(muscle.toLowerCase())}
                                            className="form-checkbox"
                                        />
                                        {t(muscle.toLowerCase())} {/* translation for each muscle */}
                                    </label>
                                ))}
                            </div>
                            {errors.muscle_groups && <p className="text-red-500">{errors.muscle_groups}</p>}

                            {/* Description */}
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder={t('workout_description')}
                                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
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
