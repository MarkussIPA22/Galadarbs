<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkoutLog; // You’ll need a model for storing workout logs

class WorkoutLogController extends Controller
{
public function store(Request $request)
{
    $request->validate([
        'workout_id' => 'required|exists:workouts,id',
        'exercises' => 'required|array',
    ]);

    $log = \App\Models\WorkoutLog::create([
        'workout_id' => $request->workout_id,
        'user_id' => auth()->id(),
        'exercises' => $request->exercises, // <--- add this
    ]);

    foreach ($request->exercises as $ex) {
        foreach ($ex['sets'] as $set) {
            $log->exerciseSets()->create([
                'exercise_id' => $ex['id'],
                'reps' => $set['reps'],
                'weight' => $set['weight'],
            ]);
        }
    }

    return redirect()->back()->with('success', 'Workout saved!');
}
}

