<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Exercise;


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
    $exercises = Exercise::orderBy('name')->get();

    return Inertia::render('Workouts/Edit', [
        'workout' => $workout->load('exercises'),
        'exercises' => $exercises,
    ]);
}


public function update(Request $request, Workout $workout)
{
    $request->validate([
        'name' => 'required',
        'description' => 'nullable|string',
        'muscle_groups' => 'required|array',
        'exercises' => 'nullable|array',
    ]);

    $workout->update([
        'name' => $request->name,
        'description' => $request->description,
        'muscle_groups' => $request->muscle_groups,
    ]);

    if ($request->has('exercises')) {
        $workout->exercises()->sync($request->exercises);
    }

    return redirect()->route('workouts.edit', $workout->id)->with('success', 'Workout updated!');
}


}
