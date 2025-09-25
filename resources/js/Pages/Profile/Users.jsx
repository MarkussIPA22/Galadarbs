import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function Users({ auth, users, query }) {
    const { t } = useTranslation();
    const [search, setSearch] = useState(query || '');
    const form = useForm({ q: search });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.get(route('users.index'), { preserveState: true });
    };

    return (
        <AuthenticatedLayout auth={auth} header={t('Members')}>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar auth={auth} />

                {/* Main Content */}
                <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors">
                    {/* Search Section */}
                    <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {t('Search_Users')}
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder={t('Search_Users')}
                                    className="w-full p-4 pr-12 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                                <svg className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                {t('Search')}
                            </button>
                        </form>
                    </div>

                    {/* Users Grid */}
                    <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                                <svg className="w-5 h-5 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                                {t('users')}
                            </h2>
                            {search && (
                                <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full font-medium">
                                    {t('Search')}: "{search}"
                                </span>
                            )}
                        </div>

                        {users.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {users.data.map(user => (
                                    <Link
                                        key={user.id}
                                        href={route('profile.show', user.id)}
                                        className="group p-6 bg-gradient-to-br from-slate-50/80 to-white/80 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:shadow-lg hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                                    >
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className="relative">
                                                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-600 shadow-lg group-hover:ring-indigo-200 dark:group-hover:ring-indigo-400 transition-all duration-200">
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
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {user.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                <span>{t('View_Profile')}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {search ? t('No_users_found') : t('No_members_yet')}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    {search ? t('No_match_search', { search }) : t('Be_the_first_to_join')}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center space-x-2">
                                    {users.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`
                                                px-4 py-2 rounded-lg font-medium transition-all duration-200 
                                                ${link.active 
                                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                                                    : link.url 
                                                        ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600' 
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                                }
                                            `}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
