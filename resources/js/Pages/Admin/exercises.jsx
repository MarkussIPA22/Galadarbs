import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useTranslation } from "react-i18next";
// Import Lucide Icons
import {
    UploadCloud,
    Search,
    X,
    Pencil,
    PlusCircle,
    Dumbbell,
} from "lucide-react";

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
    const [searchTerm, setSearchTerm] = useState("");

    const muscleGroupsEn = [
        "Back",
        "Chest",
        "Legs",
        "Biceps",
        "Triceps",
        "Shoulders",
        "Core",
        "Forearms",
    ];
    const enToLvMap = {
        Back: "Mugura",
        Chest: "Krūtis",
        Legs: "Kājas",
        Biceps: "Bicepsi",
        Triceps: "Tricepsi",
        Shoulders: "Pleci",
        Core: "Vēders",
        Forearms: "Apakšdelmi",
    };
    const lvToEnMap = Object.fromEntries(
        Object.entries(enToLvMap).map(([k, v]) => [v, k]),
    );

    useEffect(() => {
        if (muscleGroup) setMuscleGroupLv(enToLvMap[muscleGroup] || "");
    }, [muscleGroup]);
    useEffect(() => {
        if (muscleGroupLv) setMuscleGroup(lvToEnMap[muscleGroupLv] || "");
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
        if (!confirm(t("Are you sure?"))) return;
        Inertia.delete(`/admin/exercises/${id}`);
    };

    const filteredExercises = exercises.filter((ex) => {
        const matchesGroup =
            selectedGroup === "all" || ex.muscle_group === selectedGroup;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            ex.name.toLowerCase().includes(searchLower) ||
            (ex.name_lv && ex.name_lv.toLowerCase().includes(searchLower));
        return matchesGroup && matchesSearch;
    });

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t("Admin Panel")} />

            <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white p-4 sm:p-8">
                <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <h1 className="text-5xl font-black tracking-tighter italic">
                        {t("Admin Panel")}
                    </h1>
                    {successMessage && (
                        <div className="bg-[#a3e635] text-black px-8 py-3 rounded-2xl font-black shadow-xl shadow-[#a3e635]/30 animate-in fade-in zoom-in duration-300">
                            {successMessage}
                        </div>
                    )}
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-8 bg-white dark:bg-[#121212] rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-2xl">
                            <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-2">
                                <PlusCircle className="text-[#a3e635]" />{" "}
                                {t("Create Exercise")}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder={t("Name (EN)")}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-[#1d1d1d] border-transparent focus:border-[#a3e635] focus:ring-0 rounded-2xl px-6 py-4 transition-all font-medium"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder={t("Name (LV)")}
                                    value={nameLv}
                                    onChange={(e) => setNameLv(e.target.value)}
                                    className="w-full bg-slate-100 dark:bg-[#1d1d1d] border-transparent focus:border-[#a3e635] focus:ring-0 rounded-2xl px-6 py-4 transition-all font-medium"
                                    required
                                />
                                <select
                                    value={muscleGroup}
                                    onChange={(e) =>
                                        setMuscleGroup(e.target.value)
                                    }
                                    className="w-full bg-slate-100 dark:bg-[#1d1d1d] border-transparent focus:border-[#a3e635] focus:ring-0 rounded-2xl px-6 py-4 font-bold text-slate-500 appearance-none"
                                    required
                                >
                                    <option value="">
                                        {t("Select Muscle Group")}
                                    </option>
                                    {muscleGroupsEn.map((m) => (
                                        <option key={m} value={m}>
                                            {currentLang === "lv"
                                                ? enToLvMap[m] || m
                                                : m}
                                        </option>
                                    ))}
                                </select>
                                <textarea
                                    placeholder={t("Description")}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="w-full bg-slate-100 dark:bg-[#1d1d1d] border-transparent focus:border-[#a3e635] focus:ring-0 rounded-2xl px-6 py-4 h-32 resize-none transition-all font-medium"
                                />

                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] p-6 cursor-pointer hover:bg-[#a3e635]/5 hover:border-[#a3e635] transition-all group"
                                    >
                                        <div className="h-12 w-12 bg-slate-100 dark:bg-[#1d1d1d] rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                            <UploadCloud className="h-6 w-6 text-slate-400 group-hover:text-[#a3e635]" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white">
                                            {image
                                                ? image.name
                                                : t("Upload image")}
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#a3e635] hover:bg-white border-2 border-[#a3e635] text-black font-black py-5 rounded-[2rem] shadow-lg shadow-[#a3e635]/20 transition-all active:scale-[0.98] mt-6 uppercase tracking-wider text-sm"
                                >
                                    {t("Create Exercise")}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* List Side */}
                    <div className="lg:col-span-8">
                        <div className="flex flex-col gap-6 mb-8">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={t("search_exercises")}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full bg-white dark:bg-[#121212] border-slate-200 dark:border-white/5 focus:border-[#a3e635] focus:ring-0 rounded-2xl pl-12 pr-6 py-4 transition-all shadow-sm font-medium"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#121212] p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                                <button
                                    onClick={() => setSelectedGroup("all")}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedGroup === "all" ? "bg-[#a3e635] text-black scale-105" : "text-slate-400 hover:bg-slate-100"}`}
                                >
                                    {t("all")}
                                </button>
                                {muscleGroupsEn.map((group) => (
                                    <button
                                        key={group}
                                        onClick={() => setSelectedGroup(group)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedGroup === group ? "bg-[#a3e635] text-black scale-105" : "text-slate-400 hover:bg-slate-100"}`}
                                    >
                                        {currentLang === "lv"
                                            ? enToLvMap[group] || group
                                            : group}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                            {filteredExercises.length > 0 ? (
                                filteredExercises.map((ex) => (
                                    <div
                                        key={ex.id}
                                        className="group bg-white dark:bg-[#121212] rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden hover:shadow-2xl hover:shadow-[#a3e635]/10 transition-all duration-500"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-black">
                                            {ex.image_path ? (
                                                <img
                                                    src={ex.image_path}
                                                    alt=""
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-xs">
                                                    No Preview
                                                </div>
                                            )}

                                            <button
                                                onClick={() =>
                                                    handleDelete(ex.id)
                                                }
                                                className="absolute top-4 right-4 h-10 w-10 bg-black/40 hover:bg-red-500 text-white rounded-full backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>

                                            <div className="absolute bottom-4 left-4 bg-[#a3e635] text-black text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg">
                                                {currentLang === "lv"
                                                    ? ex.muscle_group_lv
                                                    : ex.muscle_group}
                                            </div>
                                        </div>

                                        <div className="p-8 flex items-center justify-between gap-4">
                                            <h3 className="text-xl font-black truncate group-hover:text-[#a3e635] transition-colors">
                                                {currentLang === "lv"
                                                    ? ex.name_lv
                                                    : ex.name}
                                            </h3>
                                            <Link
                                                href={`/admin/exercises/${ex.id}/edit`}
                                                className="h-12 w-12 flex-shrink-0 bg-slate-100 dark:bg-[#1d1d1d] hover:bg-[#a3e635] hover:text-black rounded-2xl flex items-center justify-center transition-all group/btn"
                                            >
                                                <Pencil className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-32 flex flex-col items-center justify-center text-slate-400 bg-white dark:bg-[#121212] rounded-[3rem] border-2 border-dashed border-slate-200">
                                    <Dumbbell className="h-12 w-12 mb-4 opacity-20" />
                                    <p className="text-xl font-bold italic uppercase">
                                        {t("No exercises found.")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
