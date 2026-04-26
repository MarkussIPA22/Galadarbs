import { useState } from "react";
import Sidebar from "@/Components/Sidebar";
import { Menu, X } from "lucide-react";

export default function AuthenticatedLayout({ auth, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
            <div className="flex min-h-screen">
                <div
                    className={`fixed inset-y-0 left-0 z-[60] transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
                >
                    <Sidebar
                        auth={auth}
                        isOpen={isSidebarOpen}
                        toggleSidebar={() => setIsSidebarOpen(false)}
                    />
                </div>

                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-[55] md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <div className="flex-1 flex flex-col min-w-0">
                    {!isSidebarOpen && (
                        <header className="md:hidden sticky top-0 z-50 p-4 flex justify-end items-center bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-1 text-zinc-600 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors"
                            >
                                <Menu size={24} />
                            </button>
                        </header>
                    )}

                    <main className="flex-1">{children}</main>
                </div>
            </div>
        </div>
    );
}
