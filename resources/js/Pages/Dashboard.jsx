import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 p-6 transition-colors">
                    <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                        Menu
                    </h2>
                    <nav className="flex flex-col gap-3">
                        <a
                            href="/dashboard"
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Create Workout
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            My Workouts
                        </a>
                        <a
                            href="/profile"
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Profile
                        </a>
                        <a
                            href="#"
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Settings
                        </a>
                    </nav>
                </aside>

                {}
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
                            <p className="text-2xl font-bold">12</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Completed Workouts
                            </h3>
                            <p className="text-2xl font-bold">34</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
                                Next Workout
                            </h3>
                            <p className="text-2xl font-bold">Leg Day</p>
                        </div>
                    </div>

                    {}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 transition-colors">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            Create a New Workout
                        </h2>
                        <form className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Workout Name"
                                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
                            />
                            <textarea
                                placeholder="Workout Description"
                                className="border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
                            ></textarea>
                            <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                                Create Workout
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
