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
            <Head title={t("Login")} />

            <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-gray-950 dark:to-gray-950 transition-colors duration-300 flex flex-col">
                <LandingNavbar auth={auth} />

                <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
                    <div className="w-full max-w-md">
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="bg-white dark:bg-gray-900/50 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-emerald-500/5 p-6 sm:p-10"
                        >
                            <div className="mb-6 sm:mb-8 text-center sm:text-left">
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                                    {t("Welcome Back")}
                                </h2>
                            </div>

                            {status && (
                                <div className="mb-6 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                    {status}
                                </div>
                            )}

                            <form
                                onSubmit={submit}
                                className="space-y-4 sm:space-y-5"
                            >
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value={t("email")}
                                        className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block"
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
                                    <div className="flex justify-between items-center mb-2">
                                        <InputLabel
                                            htmlFor="password"
                                            value={t("password")}
                                            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block"
                                        />
                                        {canResetPassword && (
                                            <Link
                                                href={route("password.request")}
                                                className="text-[10px] sm:text-xs font-semibold text-emerald-500 hover:text-emerald-600"
                                            >
                                                {t("Forgot password?")}
                                            </Link>
                                        )}
                                    </div>
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

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked,
                                                )
                                            }
                                            className="rounded-md border-gray-300 dark:border-gray-700 text-emerald-500 focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {t("Remember Me")}
                                        </span>
                                    </label>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    whileHover={{
                                        scale: processing ? 1 : 1.01,
                                    }}
                                    whileTap={{ scale: processing ? 1 : 0.99 }}
                                    className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 mt-2"
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t("Signing in...")}
                                        </div>
                                    ) : (
                                        <>
                                            {t("Login")}
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("Don't have an account?")}{" "}
                                    <Link
                                        href={route("register")}
                                        className="font-bold text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center"
                                    >
                                        {t("Register")}
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </main>

                <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10 select-none">
                    <div className="absolute top-1/4 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-1/4 -right-20 w-48 sm:w-64 h-48 sm:h-64 bg-emerald-400/10 dark:bg-emerald-400/5 blur-[80px] rounded-full" />
                </div>
            </div>
        </>
    );
}
