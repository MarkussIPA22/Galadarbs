import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function OneRepMaxCalculator({ auth }) {
    const { t } = useTranslation();
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [oneRM, setOneRM] = useState(null);

    const calculateOneRM = () => {
        const w = parseFloat(weight);
        const r = parseInt(reps);

        if (!w || !r || r <= 0) {
            setOneRM(
                <span className="text-red-500 font-bold">
                    {t("calc_fail")}
                </span>,
            );
            return;
        }

        const max = w * (1 + r / 30);
        setOneRM(
            <span className="text-lime-500 dark:text-lime-400 font-bold text-2xl">
                {max.toFixed(1)}{" "}
                <span className="text-sm text-zinc-500">kg</span>
            </span>,
        );
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="min-h-screen bg-white dark:bg-black p-4 sm:p-6 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-900 dark:text-white">
                                {t("oneRepMaxCalculator")}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 ml-1">
                                    {t("weight_kg")}
                                </label>
                                <input
                                    type="number"
                                    value={weight}
                                    placeholder={t(
                                        "Enter the weight you perform for your exercise.",
                                    )}
                                    min={1}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5 ml-1">
                                    {t("reps")}
                                </label>
                                <input
                                    type="number"
                                    value={reps}
                                    placeholder={t(
                                        "Enter the ammount of reps you did with the weight.",
                                    )}
                                    min={1}
                                    onChange={(e) => setReps(e.target.value)}
                                    className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            <button
                                onClick={calculateOneRM}
                                className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(163,230,53,0.2)] active:scale-[0.98] mt-2"
                            >
                                {t("calculate1RM")}
                            </button>
                        </div>

                        {oneRM && (
                            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center animate-in fade-in zoom-in duration-300">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                                    {t("estimated1RM")}
                                </p>
                                <div className="flex items-center justify-center gap-1">
                                    {oneRM}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
