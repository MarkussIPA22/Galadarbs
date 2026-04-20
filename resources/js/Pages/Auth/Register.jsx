import { useEffect } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronRight, Mail, Lock, User } from "lucide-react";
import LandingNavbar from "@/Components/LandingNavbar";

export default function Register(auth) {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            // Only reset password on unmount
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            preserveScroll: true,
        });
    };

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white dark:from-gray-950 dark:to-gray-950 transition-colors duration-300 flex flex-col">
            <Head title={t("Create Account")} />

            <LandingNavbar auth={auth} />

            <main className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 32, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.15,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        <div className="bg-white dark:bg-gray-900/50 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-emerald-500/5 p-8 sm:p-10">
                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                                    {t("Create Account")}
                                </h2>
                            </div>

                            <form onSubmit={submit} className="space-y-5 ">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
                                        {t("Name")}
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="pl-11 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all py-3.5 text-sm outline-none"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <InputError
                                        message={errors.name}
                                        className="mt-1.5 text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
                                        {t("email")}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="pl-11 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all py-3.5 text-sm outline-none"
                                            placeholder={t("email@example.com")}
                                            required
                                        />
                                    </div>
                                    <InputError
                                        message={errors.email}
                                        className="mt-1.5 text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 block">
                                        {t("password")}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            className="pl-11 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all py-3.5 text-sm outline-none"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <InputError
                                        message={errors.password}
                                        className="mt-1.5 text-xs"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    whileHover={{
                                        scale: processing ? 1 : 1.01,
                                    }}
                                    whileTap={{
                                        scale: processing ? 1 : 0.99,
                                    }}
                                    className="group w-full flex items-center justify-center gap-2 py-4 px-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 mt-4"
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t("Creating account...")}
                                        </div>
                                    ) : (
                                        <>
                                            {t("Create Account")}
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("Existing")}{" "}
                                    <Link
                                        href={route("login")}
                                        className="font-semibold text-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                    >
                                        {t("Login")} →
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/5 dark:bg-emerald-400/10 blur-[100px] rounded-full" />
            </div>
        </div>
    );
}
