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

    public function index()
    {
        $workouts = Workout::where('user_id', auth()->id())->get();

        return inertia('myWorkouts', [
            'workouts' => $workouts
        ]);
    }

   public function edit(Workout $workout)
{
    // eager load exercises
    $workout->load('exercises');

    return inertia('EditWorkout', [
        'workout' => $workout,
        'exercises' => \App\Models\Exercise::orderBy('name')->get(), // all exercises for selection
    ]);
}


public function update(Request $request, Workout $workout)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'muscle_groups' => 'nullable|array',
        'muscle_groups.*' => 'string',
        'exercises' => 'nullable|array',
        'exercises.*' => 'exists:exercises,id',
    ]);

    $workout->update([
        'name' => $request->name,
        'description' => $request->description,
        'muscle_groups' => $request->muscle_groups ?? [],
    ]);

    if ($request->has('exercises')) {
        $workout->exercises()->sync($request->exercises);
    }

    return redirect()->route('workouts.index')->with('success', 'Workout updated!');
}


}
