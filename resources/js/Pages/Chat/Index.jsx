import React, { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Index({
    auth,
    receiver,
    users = [],
    initialMessages = [],
}) {
    const { t } = useTranslation();

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState(
        initialMessages.map((m) => ({
            user:
                m.sender_id === auth.user.id ? auth.user.name : receiver?.name,
            text: m.message,
            self: m.sender_id === auth.user.id,
            time: new Date(m.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        })),
    );

    const [unreadCounts, setUnreadCounts] = useState({});
    const scrollRef = useRef(null);

    useEffect(() => {
        const channel = window.Echo.private(`chat.user.${auth.user.id}`);

        channel.listen(".MessageSent", (data) => {
            if (data.senderId === receiver?.id) {
                setMessages((prev) => [
                    ...prev,
                    {
                        user: data.username,
                        text: data.message,
                        self: false,
                        time: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                ]);
            } else {
                setUnreadCounts((prev) => ({
                    ...prev,
                    [data.senderId]: (prev[data.senderId] || 0) + 1,
                }));
            }
        });

        return () => {
            window.Echo.leave(`chat.user.${auth.user.id}`);
        };
    }, [auth.user.id, receiver?.id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !receiver) return;

        const textToSend = message;
        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        setMessages((prev) => [
            ...prev,
            { user: auth.user.name, text: textToSend, self: true, time: time },
        ]);

        setMessage("");

        try {
            await axios.post(route("chat.send"), {
                message: textToSend,
                receiverId: receiver.id,
            });
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head
                title={receiver ? `Chat with ${receiver.name}` : t("Messages")}
            />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex h-[75vh] overflow-hidden shadow-sm">
                    <div className="w-72 border-r border-zinc-100 dark:border-zinc-800 flex flex-col bg-zinc-50/30 dark:bg-zinc-900/50">
                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                {t("Direct Messages")}
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {users.map((u) => (
                                <Link
                                    key={u.id}
                                    href={route("chat.with", u.id)}
                                    className={`w-full px-6 py-4 flex items-center justify-between transition-all border-l-4 ${
                                        receiver?.id === u.id
                                            ? "bg-white dark:bg-zinc-800 border-zinc-900 dark:border-white shadow-sm"
                                            : "border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                                            {u.name
                                                .substring(0, 2)
                                                .toUpperCase()}
                                        </div>
                                        <span
                                            className={`text-sm ${unreadCounts[u.id] > 0 ? "font-bold text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}
                                        >
                                            {u.name}
                                        </span>
                                    </div>
                                    {unreadCounts[u.id] > 0 && (
                                        <span className="bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-black px-1.5 py-0.5 rounded">
                                            {unreadCounts[u.id]}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
                        {receiver ? (
                            <>
                                <div className="px-8 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                                        {receiver.name}
                                    </h3>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-zinc-50/50 dark:bg-zinc-900">
                                    {messages.length === 0 && (
                                        <div className="h-full flex items-center justify-center text-zinc-400 text-[10px] uppercase tracking-widest">
                                            {t("Start of conversation")}
                                        </div>
                                    )}

                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`flex ${msg.self ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[70%] flex flex-col ${msg.self ? "items-end" : "items-start"}`}
                                            >
                                                <div className="flex items-center gap-2 mb-1 px-1">
                                                    <span className="text-[9px] font-bold uppercase text-zinc-400">
                                                        {msg.self
                                                            ? t("You")
                                                            : msg.user}
                                                    </span>
                                                    <span className="text-[9px] text-zinc-300 dark:text-zinc-600 font-mono">
                                                        {msg.time}
                                                    </span>
                                                </div>

                                                <div
                                                    className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                                        msg.self
                                                            ? "bg-zinc-900 dark:bg-white text-white dark:text-black rounded-tr-none"
                                                            : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700 rounded-tl-none"
                                                    }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={scrollRef} />
                                </div>

                                <form
                                    onSubmit={sendMessage}
                                    className="p-6 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800"
                                >
                                    <div className="flex gap-4 items-center bg-zinc-100 dark:bg-zinc-800/60 rounded-xl p-2 px-4 focus-within:ring-1 focus-within:ring-zinc-400 transition-all">
                                        <textarea
                                            value={message}
                                            maxLength={2000}
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            placeholder={`${t("Message")} ${receiver.name}...`}
                                            className="flex-1 bg-transparent border-none focus:ring-0 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-500"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!message.trim()}
                                            className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white hover:opacity-50 disabled:opacity-20 transition-all"
                                        >
                                            {t("Send")}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-zinc-400">
                                <p className="text-[10px] uppercase font-bold tracking-[0.3em]">
                                    {t("Select a conversation")}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
