import { Link } from '@inertiajs/react';

export default function Sidebar({ auth }) {
    return (
        <aside className="w-64 bg-white dark:bg-gray-900  p-6 ">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Menu
            </h2>
            <nav className="flex flex-col gap-3">
                <Link
                    href="/dashboard"
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    Dashboard
                </Link>

                <Link
                    href={route('workouts.create')}
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    Create Workout
                </Link>

                 <Link
                     href="/my-workouts"
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    My Workouts
                </Link>

                <Link
                    href="/profile"
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    Profile
                </Link>

                {auth.user?.is_admin && (
                    <Link
                        href={route('admin.dashboard')}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        Admin Panel
                    </Link>
                )}

            </nav>
        </aside>
    );
}
