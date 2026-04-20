import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { useState } from "react";
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";
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
            onSuccess: () => console.log("Stats updated successfully"),
        });
    };

    const heightInMeters = parseFloat(data.height) / 100;
    const bmi =
        data.weight && data.height && heightInMeters > 0
            ? (
                  parseFloat(data.weight) /
                  (heightInMeters * heightInMeters)
              ).toFixed(1)
            : null;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {t("Profile")}
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                <ResponsiveSidebar auth={auth} />

                <main className="flex-1 py-8 px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col-reverse lg:flex-row gap-8">
                        <div className="w-full lg:w-2/3 flex flex-col gap-6">
                            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>

                        <div className="w-full lg:w-1/3 flex flex-col items-center bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow mb-8 lg:mb-0 h-fit sticky top-6">
                            <h3 className="text-lg font-semibold mb-4">
                                {t("Profile Picture")}
                            </h3>

                            <img
                                src={
                                    profilePic
                                        ? URL.createObjectURL(profilePic)
                                        : user.profile_pic_url ||
                                          "/storage/avatar/avatar.jpg"
                                }
                                alt="Profile"
                                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 mb-4"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                                className="mb-4 text-sm w-full"
                            />
                            <button
                                onClick={handlePicSubmit}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full"
                            >
                                {t("Update Picture")}
                            </button>

                            <form
                                onSubmit={handleMetricsSubmit}
                                className="mt-8 w-full border-t dark:border-gray-700 pt-6"
                            >
                                <h4 className="text-lg font-semibold text-blue-500 mb-4 text-center">
                                    {t("Body Metrics")}
                                </h4>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="height"
                                            value={t("Height (cm)")}
                                        />
                                        <TextInput
                                            id="height"
                                            type="number"
                                            className="mt-1 block w-full"
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
                                    <div>
                                        <InputLabel
                                            htmlFor="weight"
                                            value={t("Weight (kg)")}
                                        />
                                        <TextInput
                                            id="weight"
                                            type="number"
                                            className="mt-1 block w-full"
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

                                <div className="flex items-center justify-between">
                                    <PrimaryButton disabled={processing}>
                                        {t("Update Stats")}
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-green-600">
                                            {t("Saved.")}
                                        </p>
                                    </Transition>
                                </div>

                                {bmi && (
                                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                        <p className="text-xs uppercase text-gray-500">
                                            {t("Current BMI")}
                                        </p>
                                        <p className="text-2xl font-black text-blue-500">
                                            {bmi}
                                        </p>
                                    </div>
                                )}
                            </form>

                            <div className="mt-8 w-full text-center border-t dark:border-gray-700 pt-6">
                                <h4 className="text-lg font-semibold text-orange-500 mb-3">
                                    {t("Your Task Streaks")}
                                </h4>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {tasks.length === 0 && (
                                        <p className="text-gray-500 text-sm">
                                            {t("No completed tasks yet.")}
                                        </p>
                                    )}
                                    {tasks.map(
                                        (task) =>
                                            task.streak > 0 && (
                                                <div
                                                    key={task.id}
                                                    className="relative"
                                                >
                                                    <img
                                                        src="/streak/fire.png"
                                                        alt="Streak"
                                                        className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse"
                                                    />
                                                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm sm:text-base">
                                                        {task.streak}
                                                    </span>
                                                </div>
                                            ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
