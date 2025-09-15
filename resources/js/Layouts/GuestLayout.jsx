import { useState, useEffect } from 'react';

export default function GuestLayout({ children }) {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true' || false
    );

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors px-4">
                
                {/* Dark Mode Toggle */}
                <div className="absolute top-6 right-6">
                    <label htmlFor="dark-mode-toggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                id="dark-mode-toggle"
                                type="checkbox"
                                className="sr-only"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner transition-colors"></div>
                            <div
                                className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 top-0 transition-transform ${
                                    darkMode ? 'translate-x-full bg-indigo-500' : ''
                                }`}
                            ></div>
                        </div>
                        <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
                            {darkMode ? 'Dark' : 'Light'}
                        </span>
                    </label>
                </div>

                {/* Centered Card */}
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors">
                    {children}
                </div>
            </div>
        </div>
    );
}
