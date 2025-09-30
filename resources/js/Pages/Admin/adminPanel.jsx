import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { Inertia } from '@inertiajs/inertia';

export default function AdminPanel({ auth, exercises = [] }) {
    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('muscle_group', muscleGroup);
        if (image) formData.append('image', image);

        Inertia.post('/exercises', formData, {
            onSuccess: () => {
                setSuccessMessage('Exercise added successfully!');
                setName('');
                setMuscleGroup('');
                setImage(null);
            },
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this exercise?')) {
            Inertia.delete(`/exercises/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Admin Panel" />

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <Sidebar auth={auth} />

                <main className="flex-1 p-8">
                   <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
    Welcome, {auth?.name || 'Admin'}!
</h1>

                   
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                            {successMessage}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 max-w-md mb-10">
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

                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add Exercise
                            </button>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700">
                        <h2 className="text-xl font-semibold mb-4">All Exercises</h2>

                        {exercises.length > 0 ? (
                            <ul className="space-y-4">
                                {exercises.map((exercise) => (
                                    <li
                                        key={exercise.id}
                                        className="p-4 border rounded-lg shadow flex justify-between items-center dark:border-gray-700"
                                    >
                                        <div>
                                            <h3 className="text-lg font-bold">{exercise.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {exercise.muscle_group}
                                            </p>
                                            {exercise.image_path && (
                                                <img
                                                    src={`/storage/${exercise.image_path}`}
                                                    alt={exercise.name}
                                                    className="mt-2 w-24 h-24 object-cover rounded"
                                                />
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleDelete(exercise.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                No exercises created yet.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
