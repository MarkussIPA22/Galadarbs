import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function WorkoutCalendar({ value, onChange, tileClassName, title, locale }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
        {title}
      </h2>
      <div className="flex justify-center">
        <Calendar
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
          locale={locale}
          className="w-full bg-transparent text-slate-900 dark:text-slate-200"
        />
      </div>
    </div>
  );
}
