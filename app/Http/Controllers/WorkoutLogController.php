<?php

namespace App\Http\Controllers;

use App\Models\WorkoutLog;
use Illuminate\Http\Request;

class WorkoutLogController extends Controller
{
    public function store(Request $request)
{
    // Flatten exercises
    $exercises = [];
    foreach ($request->exercises as $exercise) {
        foreach ($exercise['sets'] as $set) {
            $exercises[] = [
                'name' => \App\Models\Exercise::find($exercise['id'])->name, // get name from DB
                'weight' => $set['weight'],
                'reps' => $set['reps'],
            ];
        }
    }

    // Now save as usual
    $log = WorkoutLog::create([
        'workout_id' => $request->workout_id,
        'user_id' => auth()->id(),
        'exercises' => $exercises,
    ]);

    $log->updateTasks();

    return redirect()->back()->with('success', 'Workout logged and tasks updated!');
}

}
