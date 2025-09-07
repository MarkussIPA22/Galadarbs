import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from '@/Components/SideBar';
import { Inertia } from "@inertiajs/inertia";

export default function AdminPanel({ auth }) {
    const [name, setName] = useState('');
    const [muscleGroup, setMuscleGroup] = useState(''); // NEW state
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

  

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('muscle_group', muscleGroup); // <- send muscle group
    if (image) formData.append('image', image);

    Inertia.post('/exercises', formData, {
        onSuccess: () => {
            setSuccessMessage('Exercise added successfully!');
            setName('');
            setImage(null);
            setMuscleGroup('');
        },
        onError: (errors) => {
            console.log(errors);
        }
    });
};

    return (
        <AuthenticatedLayout>
            <Head title="Admin" />

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <Sidebar auth={auth} />

                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        Welcome, {auth.user.name}!
                    </h1>

                    {/* Dashboard stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700">
                            <h3 className="font-semibold mb-2">Workouts Created</h3>
                            <p className="text-2xl font-bold">--</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700">
                            <h3 className="font-semibold mb-2">Completed Workouts</h3>
                            <p className="text-2xl font-bold">--</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700">
                            <h3 className="font-semibold mb-2">Next Workout</h3>
                            <p className="text-2xl font-bold">--</p>
                        </div>
                    </div>

                    {/* Add Exercise Form */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700 max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Exercise</h2>

                        {successMessage && (
                            <p className="mb-4 text-green-500">{successMessage}</p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Exercise Name */}
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

                            {/* Muscle Group */}
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
                            {/* Image Upload */}
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
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
