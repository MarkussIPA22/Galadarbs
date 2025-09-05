import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
  import { Link } from '@inertiajs/react';
  import Sidebar from '@/Components/Sidebar';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
        
            <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                 <Sidebar auth={auth} />
              
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        Welcome, {auth.user.name}!
                    </h1>

                    {}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Workouts Created
                            </h3>
                            <p className="text-2xl font-bold"></p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Completed Workouts
                            </h3>
                            <p className="text-2xl font-bold"></p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Next Workout
                            </h3>
                            <p className="text-2xl font-bold"></p>
                        </div>
                    </div>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}
