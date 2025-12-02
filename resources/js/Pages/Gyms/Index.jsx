import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";
import { useTranslation } from "react-i18next";

export default function GymList({ auth }) {
    const { t } = useTranslation();
    const [gyms, setGyms] = useState([]);
    const [city, setCity] = useState("");
    const [radius, setRadius] = useState(10);
    const [loading, setLoading] = useState(false);

    const findGyms = async () => {
        if (!city.trim()) return alert(t("Enter city"));

        setLoading(true);
        setGyms([]);

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/nearby-gyms?location=${encodeURIComponent(
                    city
                )}&radius=${radius}`
            );

            const data = await res.json();

            if (data.error) {
                alert(data.error);
            } else if (data.results?.length) {
                setGyms(data.results);
            } else {
                alert(t("No gyms found at this location"));
            }
        } catch (err) {
            console.error(err);
            alert(t("Error fetching gyms"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="flex min-h-screen bg-gray-100">
                <ResponsiveSidebar auth={auth} />

                <main className="flex-1 p-6 pt-20 bg-white dark:bg-gray-900">
                    <h1 className="text-2xl font-bold mb-4">
                        {t("Nearby Gyms")}
                    </h1>

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder={t("Enter city")}
                            className="border p-2 rounded w-full max-w-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />

                        <select
                            value={radius}
                            onChange={(e) => setRadius(Number(e.target.value))}
                            className="border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        >
                            <option value="1">1 km</option>
                            <option value="2">2 km</option>
                            <option value="5">5 km</option>
                            <option value="10">10 km</option>
                            <option value="20">20 km</option>
                            <option value="50">50 km</option>
                        </select>

                        <button
                            onClick={findGyms}
                            className="px-4 py-2 bg-emerald-500 text-white rounded  transition dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-900"
                        >
                            {loading ? t("Searching...") : t("Find Gyms")}
                        </button>
                    </div>

                    <div className="mt-6">
                        {gyms.length === 0 ? (
                            <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                                <p className="text-gray-500 dark:text-gray-400">
                                    {t("No gyms to display.")}
                                </p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {gyms.map((gym, i) => {
                                    const mapLink = gym.place_id
                                        ? `https://www.google.com/maps/place/?q=place_id:${gym.place_id}`
                                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                              gym.name +
                                                  " " +
                                                  (gym.vicinity || "")
                                          )}`;

                                    return (
                                        <li
                                            key={i}
                                            className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden"
                                        >
                                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 dark:bg-purple-600 group-hover:w-2.5 transition-all"></div>

                                            <div className="pl-3">
                                                <div className="flex items-start justify-between mb-2">
                                                    <a
                                                        href={mapLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-lg font-bold text-gray-900 dark:text-white leading-tight hover:text-emerald-600 dark:hover:text-purple-400 transition-colors flex items-center gap-2"
                                                    >
                                                        {gym.name}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            className="w-4 h-4 text-gray-400 hover:text-inherit"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                                            />
                                                        </svg>
                                                    </a>

                                                    {gym.rating && (
                                                        <span className="flex-shrink-0 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                            ★ {gym.rating}
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                                                    {gym.vicinity ||
                                                        gym.formatted_address}
                                                </p>

                                                <a
                                                    href={mapLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm font-medium text-emerald-600 dark:text-purple-400 hover:underline"
                                                >
                                                    {t("View on Map")} &rarr;
                                                </a>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
