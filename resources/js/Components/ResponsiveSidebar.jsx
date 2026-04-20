import { useState, useEffect } from "react";
import Sidebar from "@/Components/Sidebar";
import i18n from "@/i18n";

export default function ResponsiveSidebar({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    return (
        <>
            <div className="md:hidden flex justify-between items-center w-full bg-white dark:bg-[#09090b] p-4 border-b border-zinc-200 dark:border-zinc-800/50 fixed top-0 left-0 right-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-lime-400 flex items-center justify-center text-black font-black text-xs">
                        W
                    </div>
                    <h2 className="text-sm font-black tracking-tighter dark:text-white uppercase">
                        {i18n.t("menu") || "Workout"}
                    </h2>
                </div>

                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {sidebarOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            <Sidebar
                auth={auth}
                isOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(false)}
            />
        </>
    );
}
