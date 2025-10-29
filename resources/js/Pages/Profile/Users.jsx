import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useTranslation } from "react-i18next";
import ResponsiveSidebar from "@/Components/ResponsiveSidebar";

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
                    user.name.toLowerCase().includes(lower)
                )
            );
        }
    }, [search, users.data]); // Atjauno filtrētos lietotājus, kad mainās meklēšana vai dati

    return (
        <AuthenticatedLayout auth={auth} header={t("Members")}>
            <div className="flex min-h-screen">
                <ResponsiveSidebar auth={auth} />

                <div className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-colors">
                    {/* Meklēšanas ievades lauks */}
                    <div className="bg-white/70 backdrop-blur-sm dark:bg-gray-900 rounded-2xl p-6 mb-8 flex items-center gap-3">
                        <input
                            type="text"
                            value={search} // Meklēšanas vērtība
                            onChange={(e) => setSearch(e.target.value)} // Atjauno “search”, kad lietotājs raksta
                            placeholder={t("Search_Users")}
                            className="flex-1 p-4 bg-white dark:bg-gray-700 border rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all duration-200 w-full"
                        />
                    </div>

                    {/* Lietotāju kartīšu režģis */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <Link
                                    key={user.id} // Unikāls identifikators katram lietotājam
                                    href={route("profile.show", user.id)} // Saite uz lietotāja profilu
                                    className="group p-6 bg-gradient-to-r from-white to-white dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 rounded-xl transition-all duration-200"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        {/* Attēlo lietotāja profila bildi, ja tāda ir pievienota */}
                                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                                            {user.profile_pic ? (
                                                <img
                                                    src={`/storage/${user.profile_pic}`}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                // Ja nav profila bildes, rāda lietotāja vārda pirmo burtu
                                                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                                    <span className="text-xl font-bold text-white">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Lietotāja vārds */}
                                        <h3 className="font-bold text-slate-900 dark:text-white">
                                            {user.name}
                                        </h3>

                                        {/* Saite “View Profile” */}
                                        <p className="underline underline-offset-2 text-blue-900 font-medium cursor-pointer transition-colors duration-200 group-hover:text-indigo-500 dark:text-blue-300 dark:group-hover:text-indigo-300">
                                            {t("View_Profile")}
                                        </p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            //  Ja netika atrasti lietotāji
                            <p className="text-center text-slate-500 dark:text-slate-400 mt-12">
                                {t("No_users_found")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
