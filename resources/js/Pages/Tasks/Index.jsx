import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Tasks({ tasks = [], auth }) {
    const { data, setData, post, processing } = useForm({
        name: '',
        target: 0,
        date: new Date().toISOString().split('T')[0],
    });

    const handleCreateTask = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Daily Tasks</h1>

                {/* Create Task Form */}
                <form onSubmit={handleCreateTask} className="mb-6 flex gap-2">
                    <input
                        type="text"
                        placeholder="Task Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Target kg"
                        value={data.target}
                        onChange={(e) => setData('target', e.target.value)}
                        className="border p-2 rounded w-32"
                    />
                    <input
                        type="date"
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 rounded">
                        Create
                    </button>
                </form>

                {/* Task List */}
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-4 border rounded flex justify-between items-center">
                            <div>
                                <strong>{task.name}</strong>
                                <p>Progress: {task.progress} / {task.target} kg</p>
                                {task.completed && <span className="text-green-600 font-bold">Completed!</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
