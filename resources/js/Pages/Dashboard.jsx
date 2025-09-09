import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function Dashboard({ auth }) {
    const workouts = auth.user.workouts || [];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
        
            <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <Sidebar auth={auth} />
              
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        Welcome, {auth.user.name}!
                    </h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Workouts Created */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Workouts Created
                            </h3>
                            <p className="text-2xl font-bold">{workouts.length}</p>
                        </div>

                        {/* Completed Workouts (placeholder for now) */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Completed Workouts
                            </h3>
                            <p className="text-2xl font-bold">0</p>
                        </div>

                        {/* Next Workout (placeholder for now) */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Next Workout
                            </h3>
                            <p className="text-2xl font-bold">
                                {workouts.length > 0 ? workouts[0].name : 'No workouts yet'}
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
