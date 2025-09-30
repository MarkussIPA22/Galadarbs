import React from 'react';

export default function SetsList({ sets }) {
  if (!sets || sets.length === 0) {
    return <p className="text-sm text-slate-400">No sets recorded.</p>;
  }

  return (
    <>
      {sets.map((set, idx) => (
        <div key={idx} className="text-sm text-slate-200">
          Set {idx + 1}: {set.reps} reps × {set.weight} kg
        </div>
      ))}
    </>
  );
}
