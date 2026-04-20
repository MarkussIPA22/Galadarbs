import React from "react";

export default function StatCard({ title, value, accent = "lime", sub }) {
    const accentColors = {
        lime: "bg-lime-400",
        orange: "bg-orange-500",
        sky: "bg-sky-500",
        rose: "bg-rose-500",
    };

    return (
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-5 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
            <div
                className={`absolute top-0 left-0 h-full w-1 ${accentColors[accent]}`}
            />

            <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                    {title}
                </p>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-zinc-900 dark:text-white tabular-nums">
                        {value}
                    </span>
                    {sub && (
                        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-600 lowercase">
                            {sub}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
