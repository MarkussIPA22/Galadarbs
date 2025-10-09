import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function EditExercise({ exercise }) {
  const { data, setData, post, processing, errors } = useForm({
    name: exercise.name || '',
    name_lv: exercise.name_lv || '',
    muscle_group: exercise.muscle_group || '',
    muscle_group_lv: exercise.muscle_group_lv || '',
    description: exercise.description || '',
    description_lv: exercise.description_lv || '',
    video_url: exercise.video_url || '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.exercises.update', exercise.id), {
      forceFormData: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Exercise</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Name (EN)</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Name LV */}
          <div>
            <label className="block mb-1 text-sm font-medium">Name (LV)</label>
            <input
              type="text"
              value={data.name_lv}
              onChange={(e) => setData('name_lv', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
            />
            {errors.name_lv && <p className="text-red-500 text-sm">{errors.name_lv}</p>}
          </div>

          {/* Muscle Group */}
          <div>
            <label className="block mb-1 text-sm font-medium">Muscle Group (EN)</label>
            <input
              type="text"
              value={data.muscle_group}
              onChange={(e) => setData('muscle_group', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
            />
            {errors.muscle_group && <p className="text-red-500 text-sm">{errors.muscle_group}</p>}
          </div>

          {/* Muscle Group LV */}
          <div>
            <label className="block mb-1 text-sm font-medium">Muscle Group (LV)</label>
            <input
              type="text"
              value={data.muscle_group_lv}
              onChange={(e) => setData('muscle_group_lv', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
            />
            {errors.muscle_group_lv && <p className="text-red-500 text-sm">{errors.muscle_group_lv}</p>}
          </div>

          {/* Description EN */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description (EN)</label>
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Description LV */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description (LV)</label>
            <textarea
              value={data.description_lv}
              onChange={(e) => setData('description_lv', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block mb-1 text-sm font-medium">Video URL</label>
            <input
              type="text"
              value={data.video_url}
              onChange={(e) => setData('video_url', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium">Image</label>
            <input
              type="file"
              onChange={(e) => setData('image', e.target.files[0])}
              className="w-full text-gray-200"
            />
            {exercise.image_path && (
              <img
                src={exercise.image_path}
                alt="Current"
                className="mt-2 h-32 object-cover rounded-lg border border-gray-700"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <Link href={route('admin.dashboard')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
