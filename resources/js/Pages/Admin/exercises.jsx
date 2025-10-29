import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";
import { useTranslation } from "react-i18next";

export default function AdminPanel({
    auth,
    exercises = [],
    successMessage: initialMessage = "",
}) {
    const [name, setName] = useState("");
    const [nameLv, setNameLv] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionLv, setDescriptionLv] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [muscleGroupLv, setMuscleGroupLv] = useState("");
    const [image, setImage] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [successMessage, setSuccessMessage] = useState(initialMessage);
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const [selectedGroup, setSelectedGroup] = useState("all");

    const muscleGroupsEn = [
        "Back",
        "Chest",
        "Legs",
        "Biceps",
        "Triceps",
        "Shoulders",
        "Core",
    ];
    const muscleGroupsLv = [
        "Mugura",
        "Krūtis",
        "Kājas",
        "Bicepsi",
        "Tricepsi",
        "Pleci",
        "Vēders",
    ];

    const enToLvMap = {
        Back: "Mugura",
        Chest: "Krūtis",
        Legs: "Kājas",
        Biceps: "Bicepsi",
        Triceps: "Tricepsi",
        Shoulders: "Pleci",
        Core: "Vēders",
    };

    const lvToEnMap = {
        Mugura: "Back",
        Krūtis: "Chest",
        Kājas: "Legs",
        Bicepsi: "Biceps",
        Tricepsi: "Triceps",
        Pleci: "Shoulders",
        Vēders: "Core",
    };

    useEffect(() => {
        if (muscleGroup) {
            setMuscleGroupLv(enToLvMap[muscleGroup] || "");
        }
    }, [muscleGroup]);

    useEffect(() => {
        if (muscleGroupLv) {
            setMuscleGroup(lvToEnMap[muscleGroupLv] || "");
        }
    }, [muscleGroupLv]);

    const resetForm = () => {
        setName("");
        setNameLv("");
        setDescription("");
        setDescriptionLv("");
        setMuscleGroup("");
        setMuscleGroupLv("");
        setImage(null);
        setVideoUrl("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("name_lv", nameLv);
        formData.append("description", description);
        formData.append("description_lv", descriptionLv);
        formData.append("muscle_group", muscleGroup);
        formData.append("muscle_group_lv", muscleGroupLv);
        if (image) formData.append("image", image);
        if (videoUrl) formData.append("video_url", videoUrl);

        Inertia.post("/admin/exercises", formData, {
            forceFormData: true,
            onSuccess: () => {
                setSuccessMessage(t("Exercise added successfully!"));
                resetForm();
                setTimeout(() => setSuccessMessage(""), 3000);
            },
        });
    };

    const handleDelete = (id) => {
        if (!confirm(t("Are you sure you want to delete this exercise?")))
            return;
        Inertia.delete(`/admin/exercises/${id}`, {
            onSuccess: () => {
                setSuccessMessage(t("Exercise deleted successfully!"));
                setTimeout(() => setSuccessMessage(""), 3000);
            },
        });
    };

    const filteredExercises =
        selectedGroup === "all"
            ? exercises
            : exercises.filter((ex) => {
                  const group =
                      currentLang === "lv"
                          ? ex.muscle_group_lv
                          : ex.muscle_group;
                  return group === selectedGroup;
              });

    return (
        <AuthenticatedLayout>
            <Head title={t("Admin Panel")} />
            <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors">
                <ResponsiveSidebar auth={auth} />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold bg-green-500 dark:bg-purple-600 bg-clip-text text-transparent">
                            {t("Admin Panel")}
                        </h1>
                    </div>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg animate-in slide-in-from-top-2 duration-300">
                            <p className="text-emerald-800 dark:text-emerald-200 font-medium">
                                {successMessage}
                            </p>
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {t("Add New Exercise")}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    {t("Exercise Name *")}
                                </label>
                                <input
                                    type="text"
                                    placeholder={
                                        currentLang === "lv"
                                            ? t(
                                                  "Exercise name placeholder (EN)"
                                              )
                                            : "e.g., Bench Press"
                                    }
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    {t("Exercise Name (LV) *")}
                                </label>
                                <input
                                    type="text"
                                    placeholder={
                                        currentLang === "lv"
                                            ? t(
                                                  "Exercise name placeholder (LV)"
                                              )
                                            : "e.g., Spēka presēšana"
                                    }
                                    value={nameLv}
                                    onChange={(e) => setNameLv(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    {t("Description")}
                                </label>
                                <textarea
                                    placeholder={
                                        currentLang === "lv"
                                            ? t("Description placeholder (EN)")
                                            : "Describe the exercise..."
                                    }
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    {t("Description (LV)")}
                                </label>
                                <textarea
                                    placeholder={
                                        currentLang === "lv"
                                            ? t("Description placeholder (LV)")
                                            : "Apraksts latviski..."
                                    }
                                    value={descriptionLv}
                                    onChange={(e) =>
                                        setDescriptionLv(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    {t("Muscle Group *")}
                                </label>
                                <select
                                    value={muscleGroup}
                                    onChange={(e) =>
                                        setMuscleGroup(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                    required
                                >
                                    <option value="">
                                        {t("Select Muscle Group")}
                                    </option>
                                    {muscleGroupsEn.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    {t("Muscle Group (LV) *")}
                                </label>
                                <select
                                    value={muscleGroupLv}
                                    onChange={(e) =>
                                        setMuscleGroupLv(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                    required
                                >
                                    <option value="">
                                        {currentLang === "lv"
                                            ? "Izvēlies muskuļu grupu"
                                            : "Select Muscle Group"}
                                    </option>
                                    {muscleGroupsLv.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    {t("Exercise Image")}
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                    accept="image/*"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    {t("YouTube Video URL")}
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://youtube.com/..."
                                    value={videoUrl}
                                    onChange={(e) =>
                                        setVideoUrl(e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold"
                                >
                                    {t("Add Exercise")}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {t("All Exercises")}
                        </h2>

                        <div className="mb-6 flex flex-wrap items-center gap-3">
                            <label
                                htmlFor="muscleGroupFilter"
                                className="text-gray-700 dark:text-gray-300 font-semibold"
                            >
                                {t("Filter by Muscle Group")}:
                            </label>
                            <select
                                id="muscleGroupFilter"
                                value={selectedGroup}
                                onChange={(e) =>
                                    setSelectedGroup(e.target.value)
                                }
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500"
                            >
                                {[
                                    { value: "all", label: t("All") },
                                    ...(currentLang === "lv"
                                        ? muscleGroupsLv.map((m) => ({
                                              value: m,
                                              label: m,
                                          }))
                                        : muscleGroupsEn.map((m) => ({
                                              value: m,
                                              label: m,
                                          }))),
                                ].map((group) => (
                                    <option
                                        key={group.value}
                                        value={group.value}
                                    >
                                        {group.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {filteredExercises.length > 0 ? (
                            <div className="grid gap-4">
                                {filteredExercises.map((ex) => (
                                    <div
                                        key={ex.id}
                                        className="group p-5 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg transition-all duration-200"
                                    >
                                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    href={`/exercises/${ex.id}`}
                                                >
                                                    <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 hover:underline mb-1">
                                                        {currentLang === "lv"
                                                            ? ex.name_lv
                                                            : ex.name}
                                                    </h3>
                                                </Link>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                                                        {currentLang === "lv"
                                                            ? t(
                                                                  ex.muscle_group_lv
                                                              )
                                                            : t(
                                                                  ex.muscle_group
                                                              )}
                                                    </span>
                                                </div>
                                                {ex.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                                        {currentLang === "lv"
                                                            ? ex.description_lv
                                                            : ex.description}
                                                    </p>
                                                )}
                                                {ex.image_path && (
                                                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                                                        <img
                                                            src={ex.image_path}
                                                            alt={ex.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex md:flex-col gap-2">
                                                <Link
                                                    href={`/admin/exercises/${ex.id}/edit`}
                                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                                                >
                                                    {t("Edit")}
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(ex.id)
                                                    }
                                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
                                                >
                                                    {t("Delete")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    {t("No exercises found.")}
                                </p>
                                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                                    {t(
                                        "Add your first exercise to get started!"
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
