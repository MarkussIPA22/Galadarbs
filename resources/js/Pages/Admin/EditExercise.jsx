import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import {
    Save,
    X,
    Globe,
    Video,
    Image as ImageIcon,
    ChevronLeft,
} from "lucide-react";

export default function EditExercise({ exercise, auth }) {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;

    const { data, setData, processing, errors } = useForm({
        name: exercise.name || "",
        name_lv: exercise.name_lv || "",
        muscle_group: exercise.muscle_group || "",
        muscle_group_lv: exercise.muscle_group_lv || "",
        description: exercise.description || "",
        description_lv: exercise.description_lv || "",
        video_url: exercise.video_url || "",
        image: null,
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key] ?? "");
        });
        formData.append("_method", "PUT");

        Inertia.post(route("admin.exercises.update", exercise.id), formData, {
            forceFormData: true,
            onSuccess: () => {
                setSuccessMessage(t("exercise_updated_success"));
                setTimeout(() => setSuccessMessage(""), 3000);
            },
        });
    };

    const renderInput = (
        id,
        value,
        label,
        placeholder,
        error,
        onChange,
        type = "text",
    ) => (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full px-4 py-3.5 rounded-2xl border transition-all duration-300 text-sm bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-500 ${
                    error
                        ? "border-red-500/50 focus:ring-red-500/20 focus:border-red-500"
                        : "border-zinc-200 dark:border-zinc-800 focus:ring-[#a3e635]/20 focus:border-[#a3e635] dark:focus:bg-zinc-900"
                }`}
            />
            {error && (
                <p className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                    {error}
                </p>
            )}
        </div>
    );

    const renderTextarea = (id, value, label, placeholder, onChange) => (
        <div className="space-y-2 col-span-full">
            <label
                htmlFor={id}
                className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1"
            >
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                rows="5"
                className="w-full px-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 text-sm bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-500 focus:ring-[#a3e635]/20 focus:border-[#a3e635] dark:focus:bg-zinc-900 resize-none"
            />
        </div>
    );

    return (
        <AuthenticatedLayout auth={auth}>
            <Head
                title={`${t("edit")} - ${currentLang === "lv" ? exercise.name_lv : exercise.name}`}
            />

            <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#080808] text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
                <main className="max-w-[1400px] mx-auto p-4 sm:p-8 lg:p-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="space-y-2">
                            <Link
                                href={route("admin.dashboard")}
                                className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#a3e635] transition-colors text-xs font-bold uppercase tracking-widest mb-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                {t("back_to_admin")}
                            </Link>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">
                                {t("edit")}{" "}
                                <span className="text-[#a3e635] drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                                    {currentLang === "lv"
                                        ? exercise.name_lv
                                        : exercise.name}
                                </span>
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={route("admin.dashboard")}
                                className="group flex items-center gap-2 px-6 py-3 bg-zinc-200/50 dark:bg-zinc-900/50 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-400 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-transparent dark:border-zinc-800"
                            >
                                <X className="w-4 h-4" />
                                {t("cancel")}
                            </Link>
                            <button
                                form="editExerciseForm"
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-8 py-3 bg-[#a3e635] hover:bg-[#bef264] hover:scale-[1.02] active:scale-[0.98] text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(163,230,53,0.2)] disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {processing
                                    ? t("saving")
                                    : t("update_exercise")}
                            </button>
                        </div>
                    </div>

                    {successMessage && (
                        <div className="mb-8 p-4 bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] rounded-2xl font-bold text-xs uppercase tracking-widest animate-in fade-in slide-in-from-top-4 duration-500 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse" />
                            {successMessage}
                        </div>
                    )}

                    <form
                        id="editExerciseForm"
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        <div className="lg:col-span-8 space-y-8">
                            {/* English Section */}
                            <section className="bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 lg:p-10 backdrop-blur-xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">
                                        {t("english_info")}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {renderInput(
                                        "name",
                                        data.name,
                                        t("exercise_name"),
                                        "Bench Press",
                                        errors.name,
                                        (e) => setData("name", e.target.value),
                                    )}
                                    {renderInput(
                                        "muscle_group",
                                        data.muscle_group,
                                        t("primary_muscle"),
                                        "Chest",
                                        errors.muscle_group,
                                        (e) =>
                                            setData(
                                                "muscle_group",
                                                e.target.value,
                                            ),
                                    )}
                                    {renderTextarea(
                                        "description",
                                        data.description,
                                        t("description"),
                                        t("enter_details"),
                                        (e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            ),
                                    )}
                                </div>
                            </section>

                            {/* Latvian Section */}
                            <section className="bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 lg:p-10 backdrop-blur-xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-[#a3e635]/60">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">
                                        {t("latvian_info")}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {renderInput(
                                        "name_lv",
                                        data.name_lv,
                                        t("exercise_name_lv"),
                                        "Spēka presēšana",
                                        errors.name_lv,
                                        (e) =>
                                            setData("name_lv", e.target.value),
                                    )}
                                    {renderInput(
                                        "muscle_group_lv",
                                        data.muscle_group_lv,
                                        t("primary_muscle_lv"),
                                        "Krūtis",
                                        errors.muscle_group_lv,
                                        (e) =>
                                            setData(
                                                "muscle_group_lv",
                                                e.target.value,
                                            ),
                                    )}
                                    {renderTextarea(
                                        "description_lv",
                                        data.description_lv,
                                        t("description_lv"),
                                        t("enter_details_lv"),
                                        (e) =>
                                            setData(
                                                "description_lv",
                                                e.target.value,
                                            ),
                                    )}
                                </div>
                            </section>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <section className="bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-6 lg:p-8 backdrop-blur-xl sticky top-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-[#a3e635]">
                                        <Video className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">
                                        {t("media_assets")}
                                    </h2>
                                </div>

                                <div className="space-y-8">
                                    {renderInput(
                                        "video_url",
                                        data.video_url,
                                        "YouTube URL",
                                        "https://youtube.com/watch?v=...",
                                        null,
                                        (e) =>
                                            setData(
                                                "video_url",
                                                e.target.value,
                                            ),
                                    )}
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                                            {t("update_visual")}
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setData(
                                                        "image",
                                                        e.target.files[0],
                                                    )
                                                }
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="w-full py-8 px-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-[#a3e635]/50 transition-all bg-zinc-50 dark:bg-zinc-900/30">
                                                <ImageIcon className="w-6 h-6 text-zinc-500 group-hover:text-[#a3e635] transition-colors" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                                    {t("upload_new_image")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {exercise.image_path && (
                                        <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                                                {t("current_asset")}
                                            </label>
                                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black shadow-2xl">
                                                <img
                                                    src={exercise.image_path}
                                                    className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                                                    alt="Preview"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </form>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
