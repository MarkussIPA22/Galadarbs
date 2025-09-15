<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Exercise;
use App\Models\WorkoutLog;

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

        // ✅ Redirect to "My Workouts" instead of dashboard
        return redirect()->route('workouts.index')->with('success', 'Workout created!');
    }

public function create()
{
    return Inertia::render('Workouts/CreateWorkout');
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

    public function start(Workout $workout)
    {
        $workout->load('exercises');

        $latest_log = WorkoutLog::where('workout_id', $workout->id)
            ->where('user_id', auth()->id())
            ->latest()
            ->with('exerciseSets')
            ->first();

        return Inertia::render('Workouts/StartWorkout', [
            'workout' => $workout,
            'latest_log' => $latest_log,
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

        return redirect()->route('workouts.edit', $workout->id)
            ->with('success', 'Workout updated!');
    }

    public function complete(Request $request, Workout $workout)
    {
        $request->validate([
            'exercises' => 'required|array',
            'exercises.*.sets' => 'required|array',
            'exercises.*.sets.*.reps' => 'required|integer|min:0',
            'exercises.*.sets.*.weight' => 'required|numeric|min:0',
        ]);

        WorkoutLog::create([
            'user_id' => auth()->id(),
            'workout_id' => $workout->id,
            'exercises' => $request->exercises,
        ]);

        return redirect()->route('workouts.start', $workout->id)
            ->with('success', 'Workout saved!');
    }

    public function end(Workout $workout)
    {
        $workout->completed_at = now();
        $workout->save();

        return redirect()->route('workouts.show', $workout->id)
            ->with('success', 'Workout completed!');
    }


    public function destroy(Workout $workout)
    {
        $workout->delete();

        return redirect()->route('workouts.index')
            ->with('success', 'Workout deleted!');
    }

   public function dashboard()
{
    $user = auth()->user();

    // Existing workouts
    $workouts = Workout::where('user_id', $user->id)->get();

    // All completed logs (even if workout is deleted)
    $completedLogs = \App\Models\WorkoutLog::where('user_id', $user->id)
        ->with('workout:id,name') // fallback will apply for deleted workouts
        ->orderBy('created_at', 'desc')
        ->get(['id', 'workout_id', 'created_at']);

    return Inertia::render('Dashboard', [
        'auth' => ['user' => $user],
        'workouts' => $workouts,
        'completedLogs' => $completedLogs,
    ]);
}





}
