import React from "react";

export default function MuscleGroupBadge({ group }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
      {group}
    </span>
  );
}
