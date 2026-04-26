import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const { t } = useTranslation();

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {t("Profile Information")}
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {t(
                        "Update your account's profile information and email address.",
                    )}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value={t("Name")}
                        className="text-gray-700 dark:text-gray-300 font-medium mb-1"
                    />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-[#94e028] focus:ring-emerald-500 dark:focus:ring-[#94e028] rounded-xl transition-all"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value={t("Email")}
                        className="text-gray-700 dark:text-gray-300 font-medium mb-1"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:border-emerald-500 dark:focus:border-[#94e028] focus:ring-emerald-500 dark:focus:ring-[#94e028] rounded-xl transition-all"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-xl">
                        <p className="text-sm text-orange-800 dark:text-orange-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="ml-2 font-bold text-emerald-600 dark:text-[#94e028] underline hover:text-emerald-700 dark:hover:text-[#82c523] focus:outline-none"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-bold text-emerald-600 dark:text-[#94e028]">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-emerald-600 dark:bg-[#94e028] text-white dark:text-black font-black hover:bg-emerald-700 dark:hover:bg-[#82c523] px-8 py-3 rounded-xl shadow-lg transition-transform active:scale-95"
                    >
                        {t("Save")}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-emerald-600 dark:text-[#94e028]">
                            {t("Saved.")}
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
