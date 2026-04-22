import React from "react";

const muscleIconMap = {
    // English Keys
    chest: "chest.png",
    back: "back.png",
    shoulders: "shoulders.png",
    biceps: "bicep.png",
    triceps: "triceps.png",
    legs: "leg.png",
    abs: "abs.png",
    core: "abs.png",
    forearms: "forearms.png",

    // Latvian Keys (Matches what is in your DB screenshot)
    "krūtis": "chest.png",
    "mugura": "back.png",
    "pleci": "shoulders.png",
    "bicepsi": "bicep.png",
    "tricepsi": "triceps.png",
    "kājas": "leg.png",
    "apakšdelmi": "forearms.png",
    "abs": "abs.png"
};

export default function MuscleGroupBadge({ group, t }) {
    const normalizedKey = group.toLowerCase().trim();
    const iconFilename = muscleIconMap[normalizedKey];

    return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700">
            {iconFilename ? (
                <img
                    src={`/muscle_icons/${iconFilename}`}
                    alt={group}
                    className="w-4 h-4 dark:invert dark:brightness-200"
                />
            ) : (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        d="M6.5 6.5l11 11M17.5 6.5l-11 11M14 4h2v2h-2zM8 18h2v2H8zM4 8h2v2H4zM18 14h2v2h-2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
            <span>{t(normalizedKey)}</span>
        </span>
    );
}
