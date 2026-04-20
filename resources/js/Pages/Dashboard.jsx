import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StatCard from "@/Components/Workouts/StatCard";
import WorkoutCalendar from "@/Components/Workouts/WorkoutCalendar";
import CompletedWorkoutsList from "@/Components/CompletedWorkoutsList";
import "@/../css/calendar.css";
import { Head, Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

function getStreak(completedLogs) {
    if (!completedLogs.length) return 0;
    const days = [
        ...new Set(
            completedLogs.map((l) => new Date(l.created_at).toDateString()),
        ),
    ]
        .map((d) => new Date(d))
        .sort((a, b) => b - a);

    let streak = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    for (const day of days) {
        const d = new Date(day);
        d.setHours(0, 0, 0, 0);
        const diff = Math.round((cursor - d) / 86400000);
        if (diff === 0 || diff === 1) {
            streak++;
            cursor = d;
        } else break;
    }
    return streak;
}

function getThisWeekCount(completedLogs) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return completedLogs.filter((l) => new Date(l.created_at) >= startOfWeek)
        .length;
}

function getThisMonthCount(completedLogs) {
    const now = new Date();
    return completedLogs.filter((l) => {
        const d = new Date(l.created_at);
        return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
        );
    }).length;
}

function WeeklyBar({ completedLogs }) {
    const now = new Date();
    const { t } = useTranslation();

    const days = [
        t("Mon"),
        t("Tue"),
        t("Wed"),
        t("Thu"),
        t("Fri"),
        t("Sat"),
        t("Sun"),
    ];

    const todayIdx = (now.getDay() + 6) % 7;

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - todayIdx);
    startOfWeek.setHours(0, 0, 0, 0);

    const completed = completedLogs.filter(
        (l) => new Date(l.created_at) >= startOfWeek,
    );

    const completedDayIdxs = new Set(
        completed.map((l) => (new Date(l.created_at).getDay() + 6) % 7),
    );

    return (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-black dark:text-white mb-4">
                {t("This Week")}
            </h2>
            <div className="flex gap-2">
                {days.map((day, i) => {
                    const isDone = completedDayIdxs.has(i);
                    const isToday = i === todayIdx;
                    const isPast = i < todayIdx;

                    return (
                        <div
                            key={day}
                            className="flex-1 flex flex-col items-center gap-1.5"
                        >
                            <div
                                className={`w-full h-10 rounded-lg flex items-center justify-center transition-all
                                    ${
                                        isDone
                                            ? "bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.35)]"
                                            : isToday
                                              ? "bg-zinc-200 dark:bg-zinc-700 border-2 border-zinc-400 dark:border-zinc-500"
                                              : isPast
                                                ? "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                                                : "bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800"
                                    }`}
                            >
                                {isDone && (
                                    <img
                                        src="/workout/checks.png"
                                        alt="Completed"
                                        className="w-6 h-6 object-contain"
                                    />
                                )}
                            </div>

                            <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">
                                {day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default function Dashboard({
    auth,
    workouts = [],
    completedLogs = [],
    hasCompletedToday = false,
}) {
    const [value, setValue] = useState(new Date());
    const [completedDates, setCompletedDates] = useState([]);
    const { t, i18n } = useTranslation();

    const streak = getStreak(completedLogs);
    const thisWeek = getThisWeekCount(completedLogs);
    const thisMonth = getThisMonthCount(completedLogs);

    useEffect(() => {
        setCompletedDates(completedLogs.map((log) => new Date(log.created_at)));
    }, [completedLogs]);

    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return t("Good Morning") || "Good morning";
        if (h < 18) return t("Good Afternoon") || "Good afternoon";
        return t("Good Evening") || "Good evening";
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t("Dashboard")} />

            <div className="p-5 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                            {greeting()}
                        </p>
                        <h1 className="text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
                            {auth.user.name}
                        </h1>
                    </div>

                    {!hasCompletedToday ? (
                        <Link
                            href="/my-workouts"
                            className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:bg-lime-300 hover:shadow-[0_0_28px_rgba(163,230,53,0.45)] transition-all duration-200"
                        >
                            <span className="w-2 h-2 rounded-full bg-black/40 animate-pulse" />
                            {t("start_workout") || "Start Today's Workout"}
                        </Link>
                    ) : (
                        <div className="inline-flex items-center gap-2 rounded-xl bg-lime-50 dark:bg-lime-400/10 border border-lime-300 dark:border-lime-400/30 px-5 py-3 text-sm font-bold text-lime-700 dark:text-lime-400">
                            <span>✓</span>
                            {t("workout_done_today") || "Workout done today!"}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <StatCard
                        title={t("Workout Streak")}
                        value={`${streak}d`}
                    />
                    <StatCard
                        title={t("Workouts this month")}
                        value={thisMonth}
                    />
                    <StatCard
                        title={t("Workouts Created")}
                        value={workouts.length}
                    />
                </div>

                <div className="mb-6">
                    <WeeklyBar completedLogs={completedLogs} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <WorkoutCalendar
                            value={value}
                            onChange={setValue}
                            tileClassName={({ date, view }) => {
                                if (view === "month") {
                                    const isCompleted = completedDates.some(
                                        (d) =>
                                            d.toDateString() ===
                                            date.toDateString(),
                                    );
                                    return isCompleted
                                        ? "completed-workout"
                                        : "";
                                }
                            }}
                            title={t("Workout_Calendar")}
                            locale={i18n.language === "en" ? "en-US" : "lv-LV"}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <CompletedWorkoutsList
                            completedLogs={completedLogs}
                            title={t("Completed_Workouts")}
                            emptyText={t("no_completed_workouts")}
                            deletedText={t("deleted_workout")}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
