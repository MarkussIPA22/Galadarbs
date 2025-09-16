import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function Show({ exercise, auth, isFavorite }) {
    const { post, processing } = useForm();

    const toggleFavorite = () => {
        post(route('exercises.favorite', exercise.id));
    };

    // Map exercise names to YouTube IDs
    const youtubeVideos = {
        "Bench Press": "gRVjAtPip0Y",
        "Squat": "aclHkVaku9U",
        "Deadlift": "op9kVnSso6Q",
        "Shoulder Press": "2yjwXTZQDDI",
        "Pull-Up": "eGo4IYlbE5g",
        "Bicep Curl": "ykJmrZ5v0Oo",
        "Tricep Dip": "0326dy_-CzM",
        "Lunge": "QOVaHwm-Q6U",
        "Plank": "pSHjTRCQxIw",
        "Lat Pulldown": "CAwf7n6Luuc",
    };

    const videoId = youtubeVideos[exercise.name];

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={exercise.name} />

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <Sidebar auth={auth} />

                <main className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl -lg p-8 ">
                        <Link
                            href={route('exercises.index')}
                            className="inline-block mb-6 text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            ← Back to Exercises
                        </Link>

                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                {exercise.name}
                            </h1>

                            {/* Favorite button */}
                            <button
                                onClick={toggleFavorite}
                                disabled={processing}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isFavorite
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                }`}
                            >
                                {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
                            </button>
                        </div>

                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            Muscle Group:{" "}
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
                                    Tutorial Video
                                </h2>
                                <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-md">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title={exercise.name}
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        frameBorder="0"
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
