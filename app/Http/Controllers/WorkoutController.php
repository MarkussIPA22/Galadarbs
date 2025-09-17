<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use App\Models\Exercise;
use App\Models\WorkoutLog;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    public function store(Request $request)
    {
        //Validē datus no formas
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'muscle_groups' => 'required|array|min:1',
        ]);

        //Izveido jaunu treniņu
        Workout::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'description' => $request->description,
            'muscle_groups' => $request->muscle_groups,
        ]);

        return redirect()->route('workouts.index')->with('success', 'Workout created!');
    }

    public function create()
    {
        return Inertia::render('Workouts/CreateWorkout');
    }

    public function index()
    {
        $workouts = Workout::where('user_id', auth()->id())->get();

        return Inertia::render('Workouts/myWorkouts', [
            'workouts' => $workouts,
        ]);
    }

    public function edit(Workout $workout)
    {
        $locale = app()->getLocale();

        $exercises = Exercise::orderBy('name')->get()->map(function ($ex) use ($locale) {
            return [
                'id' => $ex->id,
                'name' => $locale === 'lv' && $ex->name_lv ? $ex->name_lv : $ex->name,
                'description' => $locale === 'lv' && $ex->description_lv ? $ex->description_lv : $ex->description,
                'muscle_group' => $locale === 'lv' && $ex->muscle_group_lv ? $ex->muscle_group_lv : $ex->muscle_group,
                 'muscle_group_key' => $ex->muscle_group,
                'image_path' => $ex->image_path,
            ];
        });

        // Get favorite exercises for the logged-in user
        $favoriteExercises = Favorite::where('user_id', auth()->id())
            ->pluck('exercise_id')
            ->toArray();

        return Inertia::render('Workouts/Edit', [
            'workout' => $workout->load('exercises'),
            'exercises' => $exercises,
            'favoriteExercises' => $favoriteExercises, // ✅ pass favorites
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

        $workouts = Workout::where('user_id', $user->id)->get();

        $completedLogs = WorkoutLog::where('user_id', $user->id)
            ->with('workout:id,name')
            ->orderBy('created_at', 'desc')
            ->get(['id', 'workout_id', 'created_at']);

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'workouts' => $workouts,
            'completedLogs' => $completedLogs,
        ]);
    }
}
