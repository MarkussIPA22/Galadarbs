import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const GOALS = [
    {
        id: "build_muscle",
        label: "Build Muscle",
        icon: "💪",
        desc: "Increase muscle size and definition",
    },
    {
        id: "get_stronger",
        label: "Get Stronger",
        icon: "🏋️",
        desc: "Focus on strength and heavy lifts",
    },
    {
        id: "lose_weight",
        label: "Lose Weight",
        icon: "🔥",
        desc: "Burn fat with higher rep training",
    },
    {
        id: "athletic_performance",
        label: "Athletic Performance",
        icon: "⚡",
        desc: "Improve speed, power and endurance",
    },
];

const EXPERIENCE_LEVELS = [
    {
        id: "beginner",
        label: "Beginner",
        desc: "New to training or returning after a long break",
        sets: "3 sets per exercise",
    },
    {
        id: "intermediate",
        label: "Intermediate",
        desc: "Training consistently for 6–24 months",
        sets: "4 sets per exercise",
    },
    {
        id: "advanced",
        label: "Advanced",
        desc: "Years of structured, progressive training",
        sets: "5 sets per exercise",
    },
];

const EQUIPMENT_OPTIONS = [
    { id: "Full Gym", icon: "🏟️" },
    { id: "Dumbbells", icon: "🔵" },
    { id: "Barbell", icon: "🟡" },
    { id: "Resistance Bands", icon: "🟢" },
    { id: "Bodyweight Only", icon: "🤸" },
    { id: "Pull-up Bar", icon: "🔴" },
    { id: "Kettlebells", icon: "⚫" },
];

const slideVariants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
};

export default function Onboarding({ auth }) {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const totalSteps = 6;

    const { data, setData, post, processing } = useForm({
        goal: "",
        experience: "beginner",
        frequency: 3,
        duration: "45",
        equipment: [],
        limitations: "",
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const submit = (e) => {
        e.preventDefault();
        post(route("onboarding.store"));
    };

    const toggleEquipment = (item) => {
        const current = [...data.equipment];
        const index = current.indexOf(item);
        if (index > -1) current.splice(index, 1);
        else current.push(item);
        setData("equipment", current);
    };

    const progress = (step / totalSteps) * 100;

    // ── Shared button styles ──────────────────────────────────────────────────

    const backBtn = (
        <button
            type="button"
            onClick={prevStep}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
        >
            ← Back
        </button>
    );

    const continueBtn = (label = "Continue →") => (
        <button
            type="button"
            onClick={nextStep}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_16px_rgba(163,230,53,0.25)] hover:shadow-[0_0_24px_rgba(163,230,53,0.4)] transition-all"
        >
            {label}
        </button>
    );

    const optionBase =
        "p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer";
    const optionActive =
        "border-lime-400 bg-lime-400/10 dark:bg-lime-400/10 shadow-[0_0_12px_rgba(163,230,53,0.2)]";
    const optionInactive =
        "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600";

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center py-12 px-4 transition-colors duration-200">
            <Head title="Set Up Your Plan" />

            <div className="w-full max-w-lg">
                {/* ── Header ── */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center text-black font-black text-sm shadow-[0_0_16px_rgba(163,230,53,0.35)]">
                        G
                    </div>
                    <span className="font-black text-xl text-zinc-900 dark:text-white tracking-tight">
                        GymTrack
                    </span>
                </div>

                {/* ── Card ── */}
                <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
                    {/* ── Progress ── */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                Step {step} of {totalSteps}
                            </span>
                            <span className="text-xs font-bold text-lime-600 dark:text-lime-400">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-lime-400 rounded-full shadow-[0_0_8px_rgba(163,230,53,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 20,
                                }}
                            />
                        </div>
                    </div>

                    <form onSubmit={submit}>
                        <AnimatePresence mode="wait">
                            {/* ── Step 1: Goal ── */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                                            What's your main goal?
                                        </h2>
                                        <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                            This shapes your reps, sets, and
                                            intensity.
                                        </p>
                                    </div>
                                    <div className="space-y-2.5">
                                        {GOALS.map((g) => (
                                            <button
                                                key={g.id}
                                                type="button"
                                                onClick={() => {
                                                    setData("goal", g.id);
                                                    nextStep();
                                                }}
                                                className={`w-full ${optionBase} ${data.goal === g.id ? optionActive : optionInactive}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">
                                                        {g.icon}
                                                    </span>
                                                    <div>
                                                        <p className="font-bold text-zinc-900 dark:text-white text-sm">
                                                            {g.label}
                                                        </p>
                                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                                                            {g.desc}
                                                        </p>
                                                    </div>
                                                    {data.goal === g.id && (
                                                        <span className="ml-auto text-lime-500 font-black">
                                                            ✓
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Step 2: Experience ── */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                                            Your experience level?
                                        </h2>
                                        <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                            Affects volume and exercise
                                            complexity.
                                        </p>
                                    </div>
                                    <div className="space-y-2.5">
                                        {EXPERIENCE_LEVELS.map((exp) => (
                                            <button
                                                key={exp.id}
                                                type="button"
                                                onClick={() => {
                                                    setData(
                                                        "experience",
                                                        exp.id,
                                                    );
                                                    nextStep();
                                                }}
                                                className={`w-full ${optionBase} ${data.experience === exp.id ? optionActive : optionInactive}`}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="font-bold text-zinc-900 dark:text-white text-sm capitalize">
                                                            {exp.label}
                                                        </p>
                                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                                                            {exp.desc}
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 mt-0.5
                                                            ${
                                                                data.experience ===
                                                                exp.id
                                                                    ? "bg-lime-400/20 text-lime-700 dark:text-lime-400"
                                                                    : "bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                                                            }`}
                                                    >
                                                        {exp.sets}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-3 pt-1">
                                        {backBtn}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Step 3: Frequency & Duration ── */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                                            Schedule & duration
                                        </h2>
                                        <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                            We'll build your split around this.
                                        </p>
                                    </div>

                                    {/* Frequency */}
                                    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 p-5">
                                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                                            Days per week
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "frequency",
                                                        Math.max(
                                                            1,
                                                            data.frequency - 1,
                                                        ),
                                                    )
                                                }
                                                className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-700 font-black text-zinc-700 dark:text-zinc-300 text-xl hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all flex items-center justify-center"
                                            >
                                                −
                                            </button>
                                            <div className="text-center">
                                                <span className="text-6xl font-black text-zinc-900 dark:text-white">
                                                    {data.frequency}
                                                </span>
                                                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                                                    {data.frequency === 1
                                                        ? "day / week"
                                                        : "days / week"}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "frequency",
                                                        Math.min(
                                                            7,
                                                            data.frequency + 1,
                                                        ),
                                                    )
                                                }
                                                className="w-10 h-10 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-black text-xl transition-all flex items-center justify-center shadow-[0_0_8px_rgba(163,230,53,0.3)]"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 p-5">
                                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                                            Session length
                                        </p>
                                        <div className="grid grid-cols-4 gap-2">
                                            {[
                                                {
                                                    value: "30",
                                                    label: "30m",
                                                },
                                                {
                                                    value: "45",
                                                    label: "45m",
                                                },
                                                {
                                                    value: "60",
                                                    label: "60m",
                                                },
                                                {
                                                    value: "90",
                                                    label: "90m+",
                                                },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            "duration",
                                                            opt.value,
                                                        )
                                                    }
                                                    className={`py-2.5 rounded-xl font-bold text-sm transition-all
                                                            ${
                                                                data.duration ===
                                                                opt.value
                                                                    ? "bg-lime-400 text-black shadow-[0_0_8px_rgba(163,230,53,0.3)]"
                                                                    : "bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                                                            }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        {backBtn}
                                        {continueBtn()}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Step 4: Equipment ── */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                                            Available equipment?
                                        </h2>
                                        <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                            Select all that apply — we'll only
                                            include exercises you can do.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {EQUIPMENT_OPTIONS.map((item) => {
                                            const active =
                                                data.equipment.includes(
                                                    item.id,
                                                );
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() =>
                                                        toggleEquipment(item.id)
                                                    }
                                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 font-bold text-sm transition-all
                                                            ${active ? optionActive : optionInactive}
                                                            ${active ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`}
                                                >
                                                    <span className="text-lg">
                                                        {item.icon}
                                                    </span>
                                                    <span>{item.id}</span>
                                                    {active && (
                                                        <span className="ml-auto text-lime-500 text-xs font-black">
                                                            ✓
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {data.equipment.length === 0 && (
                                        <p className="text-xs text-orange-500 dark:text-orange-400 font-semibold">
                                            Select at least one option to
                                            continue.
                                        </p>
                                    )}
                                    <div className="flex gap-3">
                                        {backBtn}
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={
                                                data.equipment.length === 0
                                            }
                                            className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_16px_rgba(163,230,53,0.25)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        >
                                            Continue →
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Step 5: Limitations ── */}
                            {step === 5 && (
                                <motion.div
                                    key="step5"
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.2 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">
                                            Any physical limitations?
                                        </h2>
                                        <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                            Mention injuries like "bad knees" or
                                            "lower back pain" and we'll avoid
                                            those movements. Leave blank if
                                            none.
                                        </p>
                                    </div>
                                    <textarea
                                        value={data.limitations}
                                        onChange={(e) =>
                                            setData(
                                                "limitations",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. lower back pain, bad knees..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-300 dark:placeholder-zinc-600 text-sm font-medium focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-colors resize-none"
                                    />
                                    <div className="flex gap-3">
                                        {backBtn}
                                        {continueBtn()}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Step 6: Confirm ── */}
                            {step === 6 && (
                                <motion.div
                                    key="step6"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.25 }}
                                    className="space-y-6 text-center"
                                >
                                    <div className="text-5xl mb-2">🚀</div>
                                    <div>
                                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
                                            Ready to build your plan?
                                        </h2>
                                        <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                            We'll generate your personalised
                                            workout split and add it to your
                                            library.
                                        </p>
                                    </div>

                                    {/* Summary */}
                                    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 p-4 text-left space-y-2">
                                        {[
                                            {
                                                label: "Goal",
                                                value: data.goal.replace(
                                                    /_/g,
                                                    " ",
                                                ),
                                            },
                                            {
                                                label: "Level",
                                                value: data.experience,
                                            },
                                            {
                                                label: "Frequency",
                                                value: `${data.frequency}x / week`,
                                            },
                                            {
                                                label: "Duration",
                                                value: `${data.duration} min`,
                                            },
                                            {
                                                label: "Equipment",
                                                value:
                                                    data.equipment.join(", ") ||
                                                    "—",
                                            },
                                        ].map(({ label, value }) => (
                                            <div
                                                key={label}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                                    {label}
                                                </span>
                                                <span className="text-xs font-bold text-zinc-900 dark:text-white capitalize">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            disabled={processing}
                                            className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 transition-all"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_16px_rgba(163,230,53,0.25)] hover:shadow-[0_0_24px_rgba(163,230,53,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            {processing
                                                ? "Building plan..."
                                                : "Generate My Plan ✓"}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-zinc-400 dark:text-zinc-600 mt-6">
                    You can edit or replace your workouts any time from your
                    library.
                </p>
            </div>
        </div>
    );
}
