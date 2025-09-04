<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'muscle_groups' => 'required|array|min:1',
            'muscle_groups.*' => 'string'
        ]);

        Workout::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'description' => $request->description,
            'muscle_groups' => $request->muscle_groups,
        ]);

        return redirect()->route('dashboard')->with('success', 'Workout created!');
    }

    public function create()
{
    return inertia('CreateWorkout');
}
}
