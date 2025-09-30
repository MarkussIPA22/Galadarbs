import React from 'react';

export default function SubmitButton({ processing, label }) {
  return (
    <button
      type="submit"
      disabled={processing}
      className="bg-emerald-500 hover:bg-emerald-600 dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-900 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300"
    >
      {label}
    </button>
  );
}
