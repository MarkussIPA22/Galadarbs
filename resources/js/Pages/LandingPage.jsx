import React from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

export default function LandingPage() {
    return (
        <div className="bg-gray-950 min-h-screen text-gray-200 font-inter overflow-x-hidden">
            <nav className="fixed top-0 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-7 h-7 text-emerald-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            <span className="text-lg font-bold text-white">
                                Liftify
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="/login"
                                className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors"
                            >
                                Pieslēgties
                            </a>
                            <a
                                href="/register"
                                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-emerald-600/20"
                            >
                                Registrēties
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20 text-center">
                <motion.div
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                        <ReactTyped
                            strings={[
                                "Seko saviem treniņiem,",
                                "Pārspēj savus limitus,",
                                "Sasniedz savus mērķus.",
                            ]}
                            typeSpeed={70}
                            backSpeed={40}
                            loop
                        />
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Liftify ir vienkārša un efektīva treniņu žurnāla
                        lietotne, kas palīdz tev sekot līdzi progresam un
                        sasniegt fitnesa mērķus.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/register"
                            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-emerald-600/30 transition-all"
                        >
                            Sākt
                        </a>
                        <a
                            href="/login"
                            className="px-8 py-4 border border-gray-700 hover:border-emerald-400 text-white rounded-lg font-semibold text-lg transition-all"
                        >
                            Pieslēgties
                        </a>
                    </div>
                </motion.div>
            </main>

            <section className="py-24 border-t border-gray-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="text-3xl font-bold text-white text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Būtiskākās funkcijas
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Viegla žurnāla pildīšana",
                                desc: "Pievieno piegājienus, atkārtojumus un svaru ar vienu pieskārienu. Bez jucekļa, tikai veiktspēja.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                ),
                            },

                            {
                                title: "Progresa analīze",
                                desc: "Vizualizē savu izaugsmi ar vienkāršiem un jaudīgiem analītikas rīkiem.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                ),
                            },
                            {
                                title: "Personalizēti treniņi",
                                desc: "Izveido personalizētus treniņus, kas precīzi pielāgoti tavām mērķiem.",
                                icon: (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                ),
                            },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-emerald-500/30 shadow-lg shadow-black/30 transition-all text-center"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.2,
                                }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                                    <svg
                                        className="w-6 h-6 text-emerald-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {f.icon}
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {f.title}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
