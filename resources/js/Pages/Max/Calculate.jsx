import ResponsiveSidebar from "@/Components/ResponsiveSidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function OneRepMaxCalculator({ auth }) {
  const { t } = useTranslation();
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [oneRM, setOneRM] = useState(null);

  const calculateOneRM = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);

    if (!w || !r || r <= 0) {
      setOneRM(
        <span className="text-red-800 dark:text-red-400 font-semibold">
          {t("calc_fail")}
        </span>
      );
      return;
    }

    const max = w * (1 + r / 30);
    setOneRM(
      <span className="text-green-700 dark:text-green-400 font-semibold">
        {max.toFixed(2)}
      </span>
    );
  };

  return (
    <AuthenticatedLayout auth={auth}>
      <div className="flex h-screen overflow-hidden">
        <ResponsiveSidebar auth={auth} />

        
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 flex items-center justify-center h-screen overflow-hidden">
          <div className="p-6 bg-white dark:bg-gray-900 rounded w-full max-w-md overflow-hidden">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
              {t("oneRepMaxCalculator")}
            </h2>

            <div className="mb-3">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                {t("weight_kg")}
              </label>
              <input
                type="number"
                value={weight}
                min={0}
                onChange={(e) => {
                  const value = e.target.value;
                  if (parseFloat(value) >= 0 || value === "") {
                    setWeight(value);
                  }
                }}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

          
            <div className="mb-3">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                {t("reps")}
              </label>
              <input
                type="number"
                value={reps}
                min={1}
                onChange={(e) => setReps(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

           
            <button
              onClick={calculateOneRM}
              className="w-full bg-blue-600 dark:bg-gradient-to-r dark:from-purple-700 dark:to-purple-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {t("calculate1RM")}
            </button>

            {oneRM && (
              <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-center text-gray-800 dark:text-gray-100">
                <strong>{t("estimated1RM")}:</strong> {oneRM}
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
