import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ exercise, auth }) {
    // Example: map exercise names to YouTube IDs (replace with your own)
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
        "Lat Pulldown": "CAwf7n6Luuc"
    };

    const videoId = youtubeVideos[exercise.name];

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={exercise.name} />
            <div className="p-8 space-y-6">
                <Link href={route('workouts.edit', 1)} className="text-blue-500 hover:underline">
                    ← Back
                </Link>

                <h1 className="text-3xl font-bold">{exercise.name}</h1>
                <p className="font-medium text-gray-600">Muscle Group: {exercise.muscle_group}</p>
                <p className="mt-4">{exercise.description}</p>

                {videoId && (
                    <div className="mt-6">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={exercise.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
