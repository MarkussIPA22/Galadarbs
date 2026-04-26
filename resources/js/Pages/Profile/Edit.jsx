import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { useTranslation } from "react-i18next";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

export default function Edit({
    mustVerifyEmail,
    status,
    user,
    auth,
    tasks = [],
}) {
    const [profilePic, setProfilePic] = useState(null);
    const { t } = useTranslation();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            height: user.height ?? "",
            weight: user.weight ?? "",
        });

    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handlePicSubmit = (e) => {
        e.preventDefault();
        if (!profilePic) return;

        const formData = new FormData();
        formData.append("profile_pic", profilePic);

        router.post(route("profile.update.pic"), formData, {
            forceFormData: true,
        });
    };

    const handleMetricsSubmit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Profile" />

            <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Page Title for Mobile */}
                    <h2 className="text-2xl font-black mb-6 lg:hidden uppercase tracking-tight">
                        {t("Profile")}
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Sidebar Column: Profile Pic & Metrics */}
                        {/* On Mobile: Appears first. On Desktop: Sticks to the right. */}
                        <div className="w-full lg:w-1/3 order-1 lg:order-2">
                            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl h-fit lg:sticky lg:top-6">
                                <h3 className="text-xl font-bold mb-6 text-emerald-600 dark:text-white tracking-tight text-center lg:text-left">
                                    {t("Profile Picture")}
                                </h3>

                                <div className="flex flex-col items-center">
                                    <div className="relative mb-6">
                                        <img
                                            src={
                                                profilePic
                                                    ? URL.createObjectURL(
                                                          profilePic,
                                                      )
                                                    : user.profile_pic_url ||
                                                      "/storage/avatar/avatar.jpg"
                                            }
                                            alt="Profile"
                                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-emerald-500/20 dark:border-[#94e028]/20 shadow-lg"
                                        />
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                        className="mb-6 text-sm text-gray-500 dark:text-gray-400 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-emerald-50 dark:file:bg-[#94e028]/10 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer transition-all"
                                    />

                                    <button
                                        onClick={handlePicSubmit}
                                        className="w-full px-6 py-3 bg-emerald-600 dark:bg-[#94e028] text-white dark:text-black font-black rounded-xl hover:opacity-90 transition-all transform active:scale-[0.98] shadow-lg"
                                    >
                                        {t("Update Picture")}
                                    </button>
                                </div>

                                {/* Metrics Section */}
                                <form
                                    onSubmit={handleMetricsSubmit}
                                    className="mt-10 w-full border-t border-gray-100 dark:border-white/5 pt-8"
                                >
                                    <h4 className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-6 text-center">
                                        {t("Body information")}
                                    </h4>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="space-y-1">
                                            <InputLabel
                                                htmlFor="height"
                                                value={t("Height (cm)")}
                                                className="dark:text-white"
                                            />
                                            <TextInput
                                                id="height"
                                                type="number"
                                                className="mt-1 block w-full bg-gray-50 dark:bg-[#0a0a0a] border-gray-300 dark:border-white/10 text-emerald-700 dark:text-white"
                                                value={data.height}
                                                onChange={(e) =>
                                                    setData(
                                                        "height",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.height}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <InputLabel
                                                htmlFor="weight"
                                                value={t("Weight (kg)")}
                                                className="dark:text-white"
                                            />
                                            <TextInput
                                                id="weight"
                                                type="number"
                                                className="mt-1 block w-full bg-gray-50 dark:bg-[#0a0a0a] border-gray-300 dark:border-white/10 text-emerald-700 dark:text-white"
                                                value={data.weight}
                                                onChange={(e) =>
                                                    setData(
                                                        "weight",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.weight}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            className="w-full justify-center bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                                        >
                                            {t("Update information")}
                                        </PrimaryButton>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-emerald-600 dark:text-white text-center font-bold">
                                                {t("Saved Successfully")}
                                            </p>
                                        </Transition>
                                    </div>
                                </form>

                                {/* Streaks Display */}
                                <div className="mt-10 w-full text-center border-t border-gray-100 dark:border-white/5 pt-8">
                                    <h4 className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] mb-4">
                                        {t("Current Streaks")}
                                    </h4>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {tasks.length === 0 ? (
                                            <p className="text-gray-400 text-xs italic">
                                                {t("No streaks yet")}
                                            </p>
                                        ) : (
                                            tasks.map(
                                                (task) =>
                                                    task.streak > 0 && (
                                                        <div
                                                            key={task.id}
                                                            className="relative group transition-transform hover:scale-110"
                                                        >
                                                            <img
                                                                src="/streak/fire.png"
                                                                alt="Streak"
                                                                className="w-12 h-12"
                                                            />
                                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-black text-lg">
                                                                {task.streak}
                                                            </span>
                                                        </div>
                                                    ),
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Forms Column */}
                        <div className="w-full lg:w-2/3 flex flex-col gap-6 order-2 lg:order-1">
                            <div className="bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-full"
                                />
                            </div>

                            <div className="bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl">
                                <UpdatePasswordForm className="max-w-full" />
                            </div>

                            <div className="bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-red-100 dark:border-red-900/20 shadow-xl">
                                <DeleteUserForm className="max-w-full" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
