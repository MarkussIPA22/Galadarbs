import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import ResponsiveSidebar from '@/Components/ResponsiveSidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from "react-i18next";

export default function EditExercise({ exercise, auth}) {
  const { data, setData, put, processing, errors } = useForm({
    name: exercise.name || '',
    name_lv: exercise.name_lv || '',
    muscle_group: exercise.muscle_group || '',
    muscle_group_lv: exercise.muscle_group_lv || '',
    description: exercise.description || '',
    description_lv: exercise.description_lv || '',
    video_url: exercise.video_url || '',
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key] ?? '');
    });

    formData.append('_method', 'PUT');

    Inertia.post(route('admin.exercises.update', exercise.id), formData, {
      forceFormData: true,
      onSuccess: () => {
        setSuccessMessage(t('exercise_updated_successfully'));
        setTimeout(() => setSuccessMessage(''), 3000);
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen flex bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="w-64 bg-gray-800 text-gray-100">
          <ResponsiveSidebar auth={auth} />
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">

            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-emerald-800 dark:text-emerald-200 font-medium">{successMessage}</p>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-8">

                <div>
                  <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("English")}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        {t("Exercise name (EN)")} *
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder={t("Exercise name placeholder (EN)")}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' :
                          'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                        }`}
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        {t("Muscle Group (EN)")}
                      </label>
                      <input
                        type="text"
                        value={data.muscle_group}
                        onChange={(e) => setData('muscle_group', e.target.value)}
                        placeholder={t("Muscle Group placeholder (EN)")}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.muscle_group ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' :
                          'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                        }`}
                      />
                      {errors.muscle_group && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.muscle_group}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("Description (EN)")}
                    </label>
                    <textarea
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder={t("Description placeholder (EN)")}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("Latvian Content")}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        {t("Exercise Name (LV)")}
                      </label>
                      <input
                        type="text"
                        value={data.name_lv}
                        onChange={(e) => setData('name_lv', e.target.value)}
                        placeholder={t("Exercise name placeholder (LV)")}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.name_lv ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' :
                          'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                        }`}
                      />
                      {errors.name_lv && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name_lv}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                        {t("Muscle Group (LV)")}
                      </label>
                      <input
                        type="text"
                        value={data.muscle_group_lv}
                        onChange={(e) => setData('muscle_group_lv', e.target.value)}
                        placeholder={t("Muscle Group placeholder (LV)")}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.muscle_group_lv ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' :
                          'border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                        }`}
                      />
                      {errors.muscle_group_lv && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.muscle_group_lv}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("Description (LV)")}
                    </label>
                    <textarea
                      value={data.description_lv}
                      onChange={(e) => setData('description_lv', e.target.value)}
                      placeholder={t("Description placeholder (LV)")}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t("Media")}</h2>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("YouTube Video URL")}
                    </label>
                    <input
                      type="text"
                      value={data.video_url}
                      onChange={(e) => setData('video_url', e.target.value)}
                      placeholder="https://youtube.com/..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("Exercise Image")}
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setData('image', e.target.files[0])}
                      accept="image/*"
                      className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-50 dark:file:bg-purple-900/30 file:text-purple-700 dark:file:text-purple-400 file:font-semibold hover:file:bg-purple-100 dark:hover:file:bg-purple-900/50 transition-all"
                    />
                    {exercise.image_path && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("Current Image")}:</p>
                        <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                          <img
                            src={exercise.image_path}
                            alt="Current exercise"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
                  >
                    {processing ? t("Saving...") : t("Save Changes")}
                  </button>
                  <Link
                    href={route('admin.dashboard')}
                    className="sm:flex-none px-6 py-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold text-center shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {t("Cancel")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
