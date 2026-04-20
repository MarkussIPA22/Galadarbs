import { useState } from "react";
import Sidebar from "@/Components/Sidebar";

export default function AuthenticatedLayout({ auth, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
            <div className="flex min-h-screen">
                <Sidebar
                    auth={auth}
                    isOpen={isSidebarOpen}
                    toggleSidebar={() => setIsSidebarOpen(false)}
                />

                <div className="flex-1 flex flex-col min-w-0">
                    <header className="md:hidden p-4 flex justify-between items-center bg-white dark:bg-[#09090b] border-b border-zinc-200 dark:border-zinc-800">
                        <div className="w-8 h-8 rounded bg-lime-400 flex items-center justify-center font-black text-black"></div>
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="text-zinc-600 dark:text-white"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </header>

                    <main className="flex-1">{children}</main>
                </div>
            </div>
        </div>
    );
}
