import React, { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ChevronLeft } from "lucide-react";
export default function Index({
    auth,
    receiver,
    users = [],
    initialMessages = [],
}) {
    const { t } = useTranslation();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [unreadCounts, setUnreadCounts] = useState({});
    const scrollRef = useRef(null);

    useEffect(() => {
        setMessages(
            initialMessages.map((m) => ({
                user:
                    m.sender_id === auth.user.id
                        ? auth.user.name
                        : receiver?.name,
                text: m.message,
                self: m.sender_id === auth.user.id,
                time: new Date(m.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            })),
        );
    }, [initialMessages, receiver]);

    useEffect(() => {
        const channel = window.Echo.private(`chat.user.${auth.user.id}`);
        channel.listen(".MessageSent", (data) => {
            const isKnownUser = users.some((u) => u.id === data.senderId);
            if (!isKnownUser) router.reload({ only: ["users"] });

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
        return () => window.Echo.leave(`chat.user.${auth.user.id}`);
    }, [auth.user.id, receiver?.id, users]);

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
            { user: auth.user.name, text: textToSend, self: true, time },
        ]);
        setMessage("");
        try {
            await axios.post(route("chat.send"), {
                message: textToSend,
                receiverId: receiver.id,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head
                title={
                    receiver
                        ? t("chat_with", { name: receiver.name })
                        : t("Chat")
                }
            />

            <div className="max-w-7xl mx-auto h-[calc(100vh-80px)] md:h-[85vh] md:py-8 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 md:border md:rounded-xl flex h-full overflow-hidden shadow-sm">
                    <div
                        className={`${receiver ? "hidden md:flex" : "flex"} w-full md:w-80 border-r border-zinc-100 dark:border-zinc-800 flex-col bg-zinc-50/30 dark:bg-zinc-900/50`}
                    >
                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                {t("Direct Messages")}
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {users.length === 0 ? (
                                <div className="p-8 text-center">
                                    <p className="text-[10px] uppercase text-zinc-400 font-bold tracking-tighter">
                                        {t("No active conversations")}
                                    </p>
                                </div>
                            ) : (
                                users.map((u) => (
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
                                ))
                            )}
                        </div>
                    </div>

                    <div
                        className={`${!receiver ? "hidden md:flex" : "flex"} flex-1 flex-col bg-white dark:bg-zinc-900`}
                    >
                        {receiver ? (
                            <>
                                <div className="px-4 md:px-8 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                                    {/* Back button for mobile */}
                                    <Link
                                        href={route("chat.index")}
                                        className="md:hidden p-2 -ml-2 text-zinc-500"
                                    >
                                        <ChevronLeft size={20} />
                                    </Link>
                                    <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                                        {receiver.name}
                                    </h3>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-zinc-50/50 dark:bg-zinc-900">
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
                                                className={`max-w-[85%] md:max-w-[70%] flex flex-col ${msg.self ? "items-end" : "items-start"}`}
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
                                    className="p-4 md:p-6 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800"
                                >
                                    <div className="flex gap-4 items-center bg-zinc-100 dark:bg-zinc-800/60 rounded-xl p-2 px-4 focus-within:ring-1 focus-within:ring-zinc-400 transition-all">
                                        <textarea
                                            value={message}
                                            rows="1"
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            placeholder={`${t("Message")} ${receiver.name}...`}
                                            className="flex-1 bg-transparent border-none focus:ring-0 py-2 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-500 resize-none"
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
