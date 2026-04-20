import { CheckCircle2 } from "lucide-react";
export default function MuscleGroupButton({
    group,
    isActive,
    toggle,
    displayName,
}) {
    return (
        <button
            type="button"
            onClick={toggle}
            className={`
                px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider 
                transition-all duration-200 flex items-center gap-2
                ${
                    isActive
                        ? "bg-lime-400 text-black border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.2)]"
                        : "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                }
            `}
        >
            {isActive && <CheckCircle2 size={12} />}
            {displayName}
        </button>
    );
}
