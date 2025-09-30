import React from "react";

export default function StatCard({ title, value, gradient }) {
  return (
    <div
      className={`relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-slate-700/50 group overflow-hidden ${gradient}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/0 dark:from-white/5 dark:to-white/0"></div>
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
