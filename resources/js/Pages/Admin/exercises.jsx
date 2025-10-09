import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/ResponsiveSidebar";
import { useTranslation } from "react-i18next";

export default function Exercises({ auth, exercises }) {
  const { t, i18n } = useTranslation();
  const { post, processing } = useForm();

  const [newExercise, setNewExercise] = useState({
    name: "",
    name_lv: "",
    muscle_group: "",
    muscle_group_lv: "",
    description: "",
    description_lv: "",
    image: null,
  });

  const [filter, setFilter] = useState("All");

  const handleAddExercise = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newExercise).forEach(([key, value]) => {
      formData.append(key, value);
    });

    post(route("exercises.store"), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        setNewExercise({
          name: "",
          name_lv: "",
          muscle_group: "",
          muscle_group_lv: "",
          description: "",
          description_lv: "",
          image: null,
        });
      },
    });
  };

  const handleDeleteExercise = (id) => {
    if (confirm(t("are_you_sure_delete"))) {
      post(route("exercises.destroy", id), { _method: "delete" });
    }
  };

  const filteredExercises =
    filter === "All"
      ? exercises
      : exercises.filter(
          (ex) =>
            ex.muscle_group.toLowerCase() === filter.toLowerCase() ||
            ex.muscle_group_lv.toLowerCase() === filter.toLowerCase()
        );

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="flex min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
        <Sidebar auth={auth} />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">{t("welcome_admin")}</h1>

          {/* Add Exercise Form */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8 transition-colors duration-300">
            <h2 className="text-xl font-bold mb-4">{t("add_new_exercise")}</h2>
            <form onSubmit={handleAddExercise} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("name_en")}
                value={newExercise.name}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, name: e.target.value })
                }
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="text"
                placeholder={t("name_lv")}
                value={newExercise.name_lv}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, name_lv: e.target.value })
                }
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="text"
                placeholder={t("muscle_group_en")}
                value={newExercise.muscle_group}
                onChange={(e) =>
                  setNewExercise({
                    ...newExercise,
                    muscle_group: e.target.value,
                  })
                }
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="text"
                placeholder={t("muscle_group_lv")}
                value={newExercise.muscle_group_lv}
                onChange={(e) =>
                  setNewExercise({
                    ...newExercise,
                    muscle_group_lv: e.target.value,
                  })
                }
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <textarea
                placeholder={t("description_en")}
                value={newExercise.description}
                onChange={(e) =>
                  setNewExercise({
                    ...newExercise,
                    description: e.target.value,
                  })
                }
                className="col-span-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <textarea
                placeholder={t("description_lv")}
                value={newExercise.description_lv}
                onChange={(e) =>
                  setNewExercise({
                    ...newExercise,
                    description_lv: e.target.value,
                  })
                }
                className="col-span-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="file"
                onChange={(e) =>
                  setNewExercise({
                    ...newExercise,
                    image: e.target.files[0],
                  })
                }
                className="col-span-2 text-gray-900 dark:text-white"
              />

              <button
                type="submit"
                disabled={processing}
                className="col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl transition-colors"
              >
                {t("save_exercise")}
              </button>
            </form>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <label className="mr-2">{t("filter_by_muscle_group")}:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="All">{t("all")}</option>
              {[...new Set(
                exercises.map((ex) =>
                  i18n.language === "lv"
                    ? ex.muscle_group_lv
                    : ex.muscle_group
                )
              )].map((group, idx) => (
                <option key={idx} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* All Exercises */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">{t("all_exercises")}</h2>
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {i18n.language === "lv"
                      ? exercise.name_lv
                      : exercise.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {i18n.language === "lv"
                      ? exercise.muscle_group_lv
                      : exercise.muscle_group}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    {i18n.language === "lv"
                      ? exercise.description_lv
                      : exercise.description}
                  </p>
                  {exercise.image_path && (
                    <img
                      src={exercise.image_path}
                      alt={
                        i18n.language === "lv"
                          ? exercise.name_lv
                          : exercise.name
                      }
                      className="mt-2 w-32 h-32 object-contain rounded"
                    />
                  )}
                </div>

                <div className="flex mt-4 sm:mt-0">
                  <button
                    onClick={() => handleDeleteExercise(exercise.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    {t("delete")}
                  </button>

                  <Link
                    href={route("admin.exercises.edit", exercise.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ml-2"
                  >
                    {t("edit")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
