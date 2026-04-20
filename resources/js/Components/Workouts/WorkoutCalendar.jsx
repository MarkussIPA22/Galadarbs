import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTranslation } from "react-i18next";

export default function WorkoutCalendar({
    value,
    onChange,
    tileClassName,
    title,
    locale,
}) {
    const { t } = useTranslation();

    return (
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-black dark:text-white mb-6">
                {title}
            </h2>

            <style>{`
                /* 1. Global Reset for the Calendar Container */
                .workout-cal-wrapper .react-calendar {
                    width: 100% !important;
                    background: transparent !important;
                    border: none !important;
                    font-family: inherit !important;
                }

                /* 2. Navigation (Month/Year Title and Arrows) */
                .workout-cal-wrapper .react-calendar__navigation button {
                    color: #27272a !important; /* Light Mode Text */
                    font-weight: 700 !important;
                }
                .dark .workout-cal-wrapper .react-calendar__navigation button {
                    color: #f4f4f5 !important; /* Dark Mode Text */
                }
                .workout-cal-wrapper .react-calendar__navigation button:enabled:hover,
                .workout-cal-wrapper .react-calendar__navigation button:enabled:focus {
                    background-color: #f4f4f5 !important;
                }
                .dark .workout-cal-wrapper .react-calendar__navigation button:enabled:hover {
                    background-color: #27272a !important;
                }

                /* 3. Weekday Labels (Pirmd, Otrd...) */
                .workout-cal-wrapper .react-calendar__month-view__weekdays__weekday abbr {
                    text-decoration: none !important;
                    font-size: 0.7rem !important;
                    font-weight: 800 !important;
                    color: #a1a1aa !important;
                }

                /* 4. Individual Day Tiles */
                .workout-cal-wrapper .react-calendar__tile {
                    padding: 10px !important;
                    border-radius: 12px !important;
                    font-size: 0.875rem !important;
                    color: #3f3f46 !important; /* Light Mode Numbers */
                }
                .dark .workout-cal-wrapper .react-calendar__tile {
                    color: #a1a1aa !important; /* Dark Mode Numbers */
                }
                
                /* Hover effect */
                .workout-cal-wrapper .react-calendar__tile:enabled:hover {
                    background-color: #f4f4f5 !important;
                }
                .dark .workout-cal-wrapper .react-calendar__tile:enabled:hover {
                    background-color: #27272a !important;
                    color: #fff !important;
                }

                /* 5. The "Selected" Day (The gray box when you click) */
                .workout-cal-wrapper .react-calendar__tile--active {
                    background: #e4e4e7 !important;
                    color: #18181b !important;
                }
                .dark .workout-cal-wrapper .react-calendar__tile--active {
                    background: #3f3f46 !important;
                    color: #ffffff !important;
                }

                /* 6. Completed Workout (LIME Green Highlight) */
                .workout-cal-wrapper .completed-workout {
                    background: #a3e635 !important;
                    color: #000000 !important; /* Keep text dark for contrast */
                    font-weight: 900 !important;
                    box-shadow: 0 0 10px rgba(163, 230, 53, 0.3);
                }

                /* 7. Today's Highlight */
                .workout-cal-wrapper .react-calendar__tile--now {
                    background: transparent !important;
                    color: #a3e635 !important;
                    text-decoration: underline !important;
                    font-weight: 900 !important;
                }

                /* Neighboring months (faded out) */
                .workout-cal-wrapper .react-calendar__month-view__days__day--neighboringMonth {
                    opacity: 0.3 !important;
                }
            `}</style>

            <div className="workout-cal-wrapper">
                <Calendar
                    onChange={onChange}
                    value={value}
                    locale={locale}
                    tileClassName={tileClassName}
                    next2Label={null}
                    prev2Label={null}
                />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md bg-lime-400" />
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                        {t("Completed")}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md border-2 border-lime-400" />
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                        {t("Today")}
                    </span>
                </div>
            </div>
        </div>
    );
}
