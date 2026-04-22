import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronRight, Lock, Mail } from "lucide-react";
import LandingNavbar from "@/Components/LandingNavBar.jsx";
export default function Login({ status, canResetPassword, auth }) {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (
        <>
            <Head title={t("login")} />

            <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-gray-950 dark:to-gray-950 transition-colors duration-300 flex flex-col">
                <LandingNavbar auth={auth} />

                <main className="flex-1 flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md">
                        <motion.div
                            initial={{ opacity: 0, y: 32, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.15,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="bg-white dark:bg-gray-900/50 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-emerald-500/5 p-8 sm:p-10"
                        >
                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                                    {t("Welcome Back")}
                                </h2>
                            </div>

                            {status && (
                                <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-5">
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value={t("email")}
                                        className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block"
                                    />
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="pl-11 w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all py-3"
                                            placeholder={t("email@example.com")}
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.email}
                                        className="mt-1.5 text-xs"
                                    />
                                </div>

                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="pl-11 w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all py-3"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.password}
                                        className="mt-1.5 text-xs"
                                    />
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked,
                                            )
                                        }
                                        className="rounded-md accent-emerald-500"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {t("Remember Me")}
                                    </span>
                                </label>

                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    whileHover={{
                                        scale: processing ? 1 : 1.02,
                                    }}
                                    whileTap={{
                                        scale: processing ? 1 : 0.98,
                                    }}
                                    className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 mt-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8H4z"
                                                />
                                            </svg>
                                            {t("Signing in...")}
                                        </>
                                    ) : (
                                        <>
                                            {t("Login")}
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("Don't have an account?")}{" "}
                                    <Link
                                        href={route("register")}
                                        className="font-semibold text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        {t("Register")} →
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </main>

                <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/5 dark:bg-emerald-400/10 blur-[100px] rounded-full" />
                </div>
            </div>
        </>
    );
}
