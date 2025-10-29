import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import { useTranslation } from "react-i18next";

export default function Show({ exercise, auth, isFavorite }) {
    const { t } = useTranslation();
    const { post, processing } = useForm();

    const toggleFavorite = () => {
        post(route("exercises.favorite", exercise.id), {
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
                return urlObj.pathname.slice(1);
            }
        } catch {
            return null;
        }
        return null;
    };

    const videoId = getYouTubeVideoId(exercise.video_url);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={exercise.name} />

            <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <Sidebar auth={auth} />

                <main className="flex-1 p-6 md:p-10">
                    <div className="max-w-5xl mx-auto bg-white/80 dark:bg-gray-900 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800 p-8 md:p-12 transition-all">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-10">
                            {exercise.image_path && (
                                <div className="w-52 h-52 sm:w-64 sm:h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={exercise.image_path}
                                        alt={exercise.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Title and Favorite */}
                            <div className="flex-1 flex flex-col justify-between w-full sm:ml-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                        {exercise.name}
                                    </h1>

                                    <button
                                        type="button"
                                        onClick={toggleFavorite}
                                        disabled={processing}
                                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 ${
                                            isFavorite
                                                ? "bg-red-500 text-white hover:bg-red-600"
                                                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        {isFavorite
                                            ? `★ ${t("favorited")}`
                                            : t("add_to_favorites")}
                                    </button>
                                </div>

                                <p className="text-lg font-medium mt-3 text-gray-700 dark:text-gray-300">
                                    {t("muscle_group")}:{" "}
                                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                                        {exercise.muscle_group}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* 📄 Description */}
                        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                                {t("description")}
                            </h2>
                            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                {exercise.description || t("no_description")}
                            </p>
                        </div>

                        {/* 🎥 Tutorial Video */}
                        {videoId && (
                            <div className="mt-10">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                                    {t("tutorial_video")}
                                </h2>
                                <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title={exercise.name}
                                        className="absolute top-0 left-0 w-full h-full rounded-2xl"
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
