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
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-lg">
                <p className="text-white font-medium">
                    {payload[0].name} :{" "}
                    <span className="text-blue-400 font-bold">
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
    personalRecords = {},
}) {
    const { t } = useTranslation();

    // Pie Chart Data Formatting
    const pieData = Object.entries(muscleCounts).map(([muscleKey, count]) => ({
        name: t(muscleKey.toLowerCase()),
        value: count,
    }));

    const COLORS = [
        "#8884d8",
        "#82ca9d",
        "#ffc658",
        "#ff7f7f",
        "#7fbfff",
        "#d17fff",
        "#ff6b6b",
        "#4ecdc4",
    ];

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <h2 className="text-2xl font-bold">{t("workout_stats")}</h2>
            }
        >
            <Head title={t("workout_stats")} />

            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                <ResponsiveSidebar auth={auth} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
                            <h3 className="text-lg font-bold mb-6 text-center lg:text-left">
                                {t("Most Trained Muscles")}
                            </h3>

                            <div className="w-full h-72 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData} // dati, kas tiks attēloti diagrammā
                                            cx="50%" // X koordināta centra pozīcija (50% = horizontāli centrēta)
                                            cy="50%" // Y koordināta centra pozīcija (50% = vertikāli centrēta)
                                            innerRadius={60}
                                            outerRadius={90} // ārējais rādiuss, cik daudzdiagramma aizpildīs vietu
                                            paddingAngle={4}
                                            dataKey="value"
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
                                            height={36}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                                {pieData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between border-b border-gray-100 dark:border-gray-700 py-1"
                                    >
                                        <span>{item.name}</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-200">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                            <h3 className="text-lg font-bold mb-6">
                                {t("Personal Records")}
                            </h3>

                            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                                {Object.entries(personalRecords).length > 0 ? (
                                    Object.entries(personalRecords).map(
                                        ([name, weight], index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`
                                        flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold
                                        ${
                                            index === 0
                                                ? "bg-yellow-100 text-yellow-700"
                                                : index === 1
                                                ? "bg-gray-200 text-gray-700"
                                                : index === 2
                                                ? "bg-orange-100 text-orange-800"
                                                : "bg-blue-50 text-blue-600"
                                        }
                                    `}
                                                    >
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-medium text-sm sm:text-base">
                                                        {name}
                                                    </span>
                                                </div>
                                                <span className="font-bold text-green-600 dark:text-green-400 text-lg whitespace-nowrap">
                                                    {weight} kg
                                                </span>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <div className="text-center py-10 text-gray-400">
                                        <p className="mb-2">📉</p>
                                        <p>{t("No Records Found")}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
