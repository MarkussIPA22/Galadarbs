import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function Show({ exercise, auth, isFavorite }) {
    const { t } = useTranslation();
    const { post, processing } = useForm();

    const toggleFavorite = () => {
        post(route('exercises.favorite', exercise.id), {
            preserveScroll: true,
        });
    };

    const getYouTubeVideoId = (url) => {
        if (!url) return null;

        try {
            const urlObj = new URL(url);

            if (urlObj.hostname.includes("youtube.com")) {
                return urlObj.searchParams.get("v");
            }

            if (urlObj.hostname === "youtu.be") {
                return urlObj.pathname.slice(1); // remove leading '/'
            }
        } catch (e) {
            return null;
        }

        return null;
    };

    const videoId = getYouTubeVideoId(exercise.video_url);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={exercise.name} />

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <Sidebar auth={auth} />

                <main className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-8">
                       

                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                {exercise.name}
                            </h1>

                            <button
                                type="button"
                                onClick={toggleFavorite}
                                disabled={processing}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isFavorite
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                }`}
                            >
                                {isFavorite ? `★ ${t('favorited')}` : t('add_to_favorites')}
                            </button>
                        </div>

                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            {t('muscle_group')}:{" "}
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                                {exercise.muscle_group}
                            </span>
                        </p>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {exercise.description}
                        </p>

                        {videoId && (
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                    {t('tutorial_video')}
                                </h2>
                                <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-md">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title={exercise.name}
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
