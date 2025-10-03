import { Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function Users({ auth, users, query }) {
    const { t } = useTranslation();
    const [search, setSearch] = useState(query || '');
    const form = useForm({ q: search });

    useEffect(() => {
        form.setData('q', search);
    }, [search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        form.get(route('users.index'), {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout auth={auth} header={t('Members')}>
            <div className="flex min-h-screen">
                <Sidebar auth={auth} />

                <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors">
                  
                   
                    <div className="bg-white/70 backdrop-blur-sm dark:bg-gray-900 rounded-2xl  p-6 mb-8">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder={t('Search_Users')}
                                className="flex-1 p-4 bg-white dark:bg-gray-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-900 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                {t('Search')}
                            </button>
                        </form>
                        {search && (
                            <p className="text-sm text-slate-500 mt-2">
                                {t('Search')}: "{search}"
                            </p>
                        )}
                    </div>

                 
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {users.data.length > 0 ? (
                            users.data.map(user => (
                                <Link
                                    key={user.id}
                                    href={route('profile.show', user.id)}
                                    className="group p-6 bg-gradient-to-r from-white to-white dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 rounded-xl  transition-all duration-200"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                                            {user.profile_pic ? (
                                                <img
                                                    src={`/storage/${user.profile_pic}`}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                                    <span className="text-xl font-bold text-white">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{user.name}</h3>
                                            <p className="underline underline-offset-2 text-blue-900 font-medium cursor-pointer transition-colors duration-200 group-hover:text-indigo-500 dark:text-blue-300 dark:group-hover:text-indigo-300">
                                                View profile
                                            </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 dark:text-slate-400 mt-12">
                                {t('No_users_found')}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
