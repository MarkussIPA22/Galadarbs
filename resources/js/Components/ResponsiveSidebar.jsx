import { useState, useEffect } from "react";
import Sidebar from "@/Components/Sidebar";
import i18n from "@/i18n";

export default function ResponsiveSidebar({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    return (
        <>
            <div className="md:hidden flex justify-between items-center w-full bg-white dark:bg-gray-900 p-4 shadow fixed top-0 left-0 right-0 z-40">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    {i18n.t("menu")}
                </h2>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-800 dark:text-gray-100 focus:outline-none"
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

            <div
                className={`
                    fixed top-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out
                  

                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:relative md:translate-x-0 md:shadow-none md:z-0
                `}
            >
                <Sidebar
                    auth={auth}
                    isOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(false)}
                />
            </div>

            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
                    sidebarOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setSidebarOpen(false)}
            />
        </>
    );
}
