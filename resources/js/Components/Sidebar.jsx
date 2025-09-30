import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Sidebar({ auth }) {
    const { i18n } = useTranslation();

    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
        router.get(route('locale.switch', lang)); 
    };

   return (
        // Sānjoslas komponente ar Tailwind CSS stilizāciju
        <aside className="w-64 bg-white dark:bg-gray-900 p-6">
            {/* Sānjoslas virsraksts */}
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
               {i18n.t('Menu')}
            </h2>

           {/*so dalu prieks tailwind , un lidz button par i18*/}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => switchLanguage('en')}
                    // Stils pogai ar valodas karogu
                    className="relative w-12 h-8 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    <img
                        src="/flags/english_flag.png"
                        alt="EN"
                        // Stils attēlam 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </button>
                
                

                <button
                    onClick={() => switchLanguage('lv')}
                    className="relative w-12 h-8 rounded overflow-hidden bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    <img
                        src="/flags/latvia_flag.png"
                        alt="LV"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </button>
            </div>

            <nav className="flex flex-col gap-3">
                <Link
                    href="/dashboard"
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {/*// atgriež "Dashboard" angļu valodā vai "Informācijas panelis" latviešu valodā, atkarībā no izvēlētās valodas*/}
                    {i18n.t('dashboard')}
                </Link>

                <Link
                    href={route('workouts.create')}
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {i18n.t('create_workout')}
                </Link>

                <Link
                    href="/my-workouts"
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {i18n.t('my_workouts')}
                </Link>

                <Link
                    href="/profile"
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {i18n.t('profile')}
                </Link>

                {auth.user?.is_admin === 1 && (
                    <Link
                        href={route('admin.dashboard')}
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {i18n.t('admin_panel')}
                    </Link>
                )}

                <Link
                    href="/exercises"
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {i18n.t('exercises')}
                </Link>

                <Link 
                href="/tasks"
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                    {i18n.t('tasks')}
                </Link>

                <Link
                href="/users"
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                   > 
                    {i18n.t('users')}
                </Link>

                <Link
                    href={route('logout')}
                    method="post"
                    className="p-2 rounded hover:bg-red-600 transition-colors"
                >
                    {i18n.t('logout')}
                </Link>
            </nav>
        </aside>
    );
}
