import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
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
    const [editingExercise, setEditingExercise] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('muscle_group', muscleGroup);
        if (image) formData.append('image', image);
        if (videoUrl) formData.append('video_url', videoUrl);

        if (editingExercise) {
            Inertia.post(
                `/admin/exercises/${editingExercise.id}`,
                formData,
                {
                    forceFormData: true,
                    onSuccess: () => {
                        setSuccessMessage('Exercise updated!');
                        resetForm();
                    },
                    onError: () => {
                    }
                }
            );
        } else {
            Inertia.post(
                '/admin/exercises',
                formData,
                {
                    forceFormData: true,
                    onSuccess: () => {
                        setSuccessMessage('Exercise added!');
                        resetForm();
                    }
                }
            );
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setMuscleGroup('');
        setImage(null);
        setVideoUrl('');
        setEditingExercise(null);
    };

    const startEdit = (exercise) => {
        setEditingExercise(exercise);
        setName(exercise.name);
        setDescription(exercise.description || '');
        setMuscleGroup(exercise.muscle_group);
        setVideoUrl(exercise.video_url || '');
        setImage(null);
    };

    const handleDelete = (id) => {
        if (!confirm('Are you sure?')) return;
        Inertia.delete(`/admin/exercises/${id}`, {
            onSuccess: () => setSuccessMessage('Exercise deleted!'),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Panel" />
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <ResponsiveSidebar auth={auth} />
                <main className="flex-1 p-6">
                    <h1 className="text-3xl font-bold mb-6">Welcome, {auth?.name || 'Admin'}!</h1>

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 dark:bg-green-800/20 text-green-800 dark:text-green-200 rounded">
                            {successMessage}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-200"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-200"
                                rows={3}
                            />
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
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full"
                            />
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="border p-2 w-full rounded dark:bg-gray-700 dark:text-gray-200"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    {editingExercise ? 'Update' : 'Add'}
                                </button>
                                {editingExercise && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>


                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">All Exercises</h2>
                        {exercises.length > 0 ? (
                            <ul className="space-y-4">
                                {exercises.map((ex) => (
                                    <li
                                        key={ex.id}
                                        className="p-4 border rounded flex justify-between items-center dark:border-gray-700"
                                    >
                                        <div>
                                            <h3 className="font-bold text-blue-500 hover:underline">
                                                <Link href={`/exercises/${ex.id}`}>{ex.name}</Link>
                                            </h3>
                                            <p className="text-sm">{ex.muscle_group}</p>
                                            {ex.description && <p className="text-sm">{ex.description}</p>}
                                            {ex.image_path && <img src={ex.image_path} className="w-24 mt-2" />}
                                            {ex.video_url && <p className="text-xs">🎥 {ex.video_url}</p>}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => startEdit(ex)}
                                                className="bg-yellow-500 px-4 py-2 rounded text-white hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ex.id)}
                                                className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No exercises found.</p>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
