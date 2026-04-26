import { Link, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import { Search, User as UserIcon } from "lucide-react"; // Added for a more professional feel

export default function Users({ auth, users }) {
    // Tulkošanas funkcija no react-i18next
    const { t } = useTranslation();
    // Meklēšanas ievades vērtība
    const [search, setSearch] = useState("");
    // Lietotāju saraksts, kas tiek filtrēts pēc meklēšanas
    const [filteredUsers, setFilteredUsers] = useState(users.data);

    // Kad mainās “search” vai “users.data”, atjaunina filtrēto sarakstu
    useEffect(() => {
        if (search === "") {
            setFilteredUsers(users.data);
            // Ja meklēšanas lauks ir tukšs — rāda visus lietotājus
        } else {
            // Ja lietotājs ievada tekstu filtrē pēc vārda
            const lower = search.toLowerCase();
            setFilteredUsers(
                users.data.filter((user) =>
                    user.name.toLowerCase().includes(lower),
                ),
            );
        }
    }, [search, users.data]); // Atjauno filtrētos lietotājus, kad mainās meklēšana vai dati

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title={t("users")} />

            <div className="min-h-screen bg-white dark:bg-[#09090b]">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    {/* Meklēšanas ievades lauks */}
                    <div className="relative max-w-md mb-10">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-zinc-400" />
                        </div>
                        <input
                            type="text"
                            value={search} // Meklēšanas vērtība
                            onChange={(e) => setSearch(e.target.value)} // Atjauno “search”, kad lietotājs raksta
                            placeholder={t("Search_Users")}
                            className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all outline-none"
                        />
                    </div>

                    {/* Lietotāju kartīšu režģis */}
                    {filteredUsers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id} // Unikāls identifikators katram lietotājam
                                    className="group relative bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl p-5 hover:border-lime-500/50 transition-all duration-300"
                                >
                                    <div className="flex flex-col items-center">
                                        {/* Attēlo lietotāja profila bildi, ja tāda ir pievienota */}
                                        <div className="relative mb-4">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-800 group-hover:border-lime-400 transition-colors duration-300">
                                                {user.profile_pic ? (
                                                    <img
                                                        src={`/storage/${user.profile_pic}`}
                                                        alt={user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    // Ja nav profila bildes, rāda lietotāja vārda pirmo burtu
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700">
                                                        <span className="text-2xl font-black text-zinc-600 dark:text-zinc-400">
                                                            {user.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-lime-500 border-2 border-white dark:border-[#09090b] rounded-full shadow-sm" />
                                        </div>

                                        {/* Lietotāja vārds */}
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 truncate w-full text-center">
                                            {user.name}
                                        </h3>

                                        {/* Saite “View Profile” */}
                                        <Link
                                            href={route(
                                                "profile.show",
                                                user.id,
                                            )} // Saite uz lietotāja profilu
                                            className="w-full py-2 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-lime-400 dark:hover:bg-lime-400 text-zinc-900 dark:text-zinc-300 hover:text-black dark:hover:text-black text-xs font-bold rounded-lg transition-all text-center"
                                        >
                                            {t("View_Profile")}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Ja netika atrasti lietotāji
                        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                            <UserIcon className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" />
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                                {t("No_users_found")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
