import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl">
                <p className="text-white text-[10px] font-bold uppercase tracking-widest">
                    {payload[0].name} :{" "}
                    <span className="text-lime-400 font-black ml-2">
                        {payload[0].value}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export default function MuscleStats({
    auth,
    muscleCounts = {},
    personalRecords = [],
    lifetimeTotalWeight = 0,
}) {
    const { t, i18n } = useTranslation();

    // Mapping pie data: Translate muscle group keys
    const pieData = Object.entries(muscleCounts).map(([muscleKey, count]) => ({
        name: t(muscleKey.toLowerCase()),
        value: count,
    }));

    const COLORS = [
        "#a3e635",
        "#71717a",
        "#f4f4f5",
        "#27272a",
        "#d4d4d8",
        "#52525b",
    ];

    const getComparison = () => {
        const kg = lifetimeTotalWeight;
        if (kg === 0) return t("Time to move some iron!");
        if (kg < 1000) return t("A Walrus");
        if (kg < 5000) return t("a T-Rex dinosaur");
        if (kg < 20000) return t("4000 Cats");
        return t("a literal Blue Whale");
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t("workout_stats")} />

            <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200">
                <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    {/* Weight Metric Hero */}
                    <div className="mb-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>

                        <div className="relative z-10">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">
                                {t("Total Weight Lifted")}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
                                <span className="text-6xl font-black text-black dark:text-zinc-200 tracking-tighter tabular-nums">
                                    {lifetimeTotalWeight.toLocaleString()}
                                </span>
                                <span className="text-black dark:text-zinc-200 font-black text-xl uppercase italic">
                                    kg
                                </span>
                            </div>

                            <div className="mt-6 flex items-center gap-4 bg-white dark:bg-zinc-800 self-start px-4 py-2 rounded-full border border-zinc-700/50">
                                {t("equivalent to")} {getComparison()}!
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Muscle Distribution */}
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-8">
                                {t("Most Trained Muscles")}
                            </h3>

                            <div className="w-full h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend
                                            verticalAlign="bottom"
                                            iconType="circle"
                                            wrapperStyle={{
                                                paddingTop: "20px",
                                                fontSize: "10px",
                                                textTransform: "uppercase",
                                                fontWeight: "bold",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* PR List */}
                        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 px-2">
                                {t("Personal Records")}
                            </h3>
                            {personalRecords.length > 0 ? (
                                personalRecords.map((record, index) => {
                                    // Logic to pick the correct name based on active language
                                    const displayName =
                                        i18n.language === "lv"
                                            ? record.name_lv || record.name_en
                                            : record.name_en;

                                    return (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center p-5 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="w-6 h-6 flex items-center justify-center rounded bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-black">
                                                    {index + 1}
                                                </span>
                                                <span className="text-sm font-bold tracking-tight text-zinc-700 dark:text-zinc-300">
                                                    {displayName}
                                                </span>
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="font-black text-zinc-900 dark:text-white text-xl tabular-nums">
                                                    {record.weight}
                                                </span>
                                                <span className="text-[9px] font-bold uppercase text-zinc-400">
                                                    kg
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                                        {t("Complete a workout first !")}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
