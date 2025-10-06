import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import ResponsiveSidebar from '@/Components/ResponsiveSidebar'; 

export default function AdminPanel({ auth, exercises = [], successMessage: initialMessage = '' }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [successMessage, setSuccessMessage] = useState(initialMessage);
    const [exerciseList, setExerciseList] = useState(exercises);
    const [filter, setFilter] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('muscle_group', muscleGroup);
        if (image) formData.append('image', image);
        if (videoUrl) formData.append('video_url', videoUrl);

        Inertia.post('/admin/exercises', formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                setExerciseList(page.props.exercises);
                setSuccessMessage(page.props.successMessage || 'Exercise added successfully!');
                setName('');
                setDescription('');
                setMuscleGroup('');
                setImage(null);
                setVideoUrl('');
            },
            onError: (errors) => console.log(errors),
        });
    };

    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this exercise?')) return;

        Inertia.delete(`/admin/exercises/${id}`, {
            preserveScroll: true,
            onSuccess: (page) => {
                setExerciseList(page.props.exercises);
                setSuccessMessage(page.props.successMessage || 'Exercise deleted successfully!');
            },
        });
    };

    const filteredExercises = filter
        ? exerciseList.filter((ex) => ex.muscle_group === filter)
        : exerciseList;

    return (
        <AuthenticatedLayout>
            <Head title="Admin Panel" />

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <ResponsiveSidebar auth={auth} />
                
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        Welcome, {auth?.name || 'Admin'}!
                    </h1>

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 dark:bg-green-800/20 text-green-800 dark:text-green-200 rounded">
                            {successMessage}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md dark:shadow-gray-700 mb-6 max-w-full">
                        <h2 className="text-xl font-semibold mb-4">Add New Exercise</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">Exercise Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-200"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Description (optional)</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-200"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Muscle Group</label>
                                <select
                                    value={muscleGroup}
                                    onChange={(e) => setMuscleGroup(e.target.value)}
                                    className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-200"
                                    required
                                >
                                    <option value="">Select Muscle Group</option>
                                    <option value="Back">Back</option>
                                    <option value="Chest">Chest</option>
                                    <option value="Legs">Legs</option>
                                    <option value="Arms">Arms</option>
                                    <option value="Shoulders">Shoulders</option>
                                    <option value="Core">Core</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Image (optional)</label>
                                <input
                                    type="file"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">YouTube Video URL (optional)</label>
                                <input
                                    type="text"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                            >
                                Add Exercise
                            </button>
                        </form>
                    </div>

                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <label className="font-medium">Filter by Muscle Group:</label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="">All</option>
                            <option value="Back">Back</option>
                            <option value="Chest">Chest</option>
                            <option value="Legs">Legs</option>
                            <option value="Arms">Arms</option>
                            <option value="Shoulders">Shoulders</option>
                            <option value="Core">Core</option>
                        </select>
                        {filter && (
                            <button
                                onClick={() => setFilter('')}
                                className="ml-2 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md dark:shadow-gray-700">
                        <h2 className="text-xl font-semibold mb-4">All Exercises</h2>
                        {filteredExercises.length > 0 ? (
                            <ul className="space-y-4">
                                {filteredExercises.map((exercise) => (
                                    <li
                                        key={exercise.id}
                                        className="p-4 border rounded-lg shadow flex flex-col sm:flex-row sm:justify-between sm:items-center dark:border-gray-700"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <div>
                                                <h3 className="text-lg font-bold">{exercise.name}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{exercise.muscle_group}</p>
                                                {exercise.description && (
                                                    <p className="text-sm text-gray-500">{exercise.description}</p>
                                                )}
                                            </div>

                                                    {exercise.image_path && (
    <img
        src={exercise.image_path}
        alt={exercise.name}
        className="mt-2 sm:mt-0 w-full sm:w-24 h-auto object-contain rounded"
    />
)}


                                            {exercise.video_url && (
                                                <p className="text-xs text-gray-500 mt-1 sm:mt-0">
                                                    🎥 Video: {exercise.video_url}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleDelete(exercise.id)}
                                            className="mt-2 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">No exercises match this filter.</p>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
