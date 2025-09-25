<?php

namespace App\Http\Controllers;

use App\Models\WorkoutLog;
use Illuminate\Http\Request;

class WorkoutLogController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'workout_id' => 'required|exists:workouts,id',
        'exercises' => 'required|array',
        'exercises.*.id' => 'required|exists:exercises,id',
        'exercises.*.sets' => 'required|array|min:1',
        'exercises.*.sets.*.reps' => 'required|integer|min:0',
        'exercises.*.sets.*.weight' => 'required|numeric|min:0',
    ]);

    // Store exercises exactly as frontend sends them
    $log = WorkoutLog::create([
        'workout_id' => $request->workout_id,
        'user_id' => auth()->id(),
        'exercises' => $request->exercises, // <-- nested structure
    ]);

    $log->updateTasks();

    return redirect()->back()->with('success', 'Workout logged and tasks updated!');
}

    public function updateTasks()
{
    foreach ($this->exercises as $exercise) {
        $exerciseModel = \App\Models\Exercise::find($exercise['id']);
        if (!$exerciseModel) continue; // skip if exercise not found

        $exerciseName = strtolower($exerciseModel->name); // ✅ get name from DB

        foreach ($exercise['sets'] as $set) {
            $totalWeight = ($set['weight'] ?? 0) * ($set['reps'] ?? 0);

            $tasks = Task::where('user_id', $this->user_id)
                ->where('date', now()->toDateString())
                ->whereRaw('LOWER(name) = ?', [$exerciseName])
                ->get();

            foreach ($tasks as $task) {
                $task->addProgress($totalWeight);
            }
        }
    }
}




}
