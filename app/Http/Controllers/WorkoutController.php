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
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'muscle_groups' => 'required|array|min:1',
    ]);

    $workout = Workout::create([
        'user_id' => auth()->id(),
        'name' => $request->name,
        'description' => $request->description,
        'muscle_groups' => $request->muscle_groups,
    ]);

    return redirect()->route('workouts.edit', $workout->id)
        ->with('success', 'Workout created! You can now add exercises.');
}


    public function create()
    {
        return Inertia::render('Workouts/CreateWorkout');
    }

  public function index()
{
    $locale = app()->getLocale();

    $muscleTranslations = [
        'chest' => 'Krūšu muskuļi',
        'back' => 'Muguras muskuļi',
        'shoulders' => 'Pleci',
        'biceps' => 'Bicepsi',
        'triceps' => 'Tricepsi',
        'legs' => 'Kājas',
        'abs' => 'Vēdera muskuļi',
        'full body' => 'Vesels ķermenis',
    ];

    $workouts = Workout::where('user_id', auth()->id())->get()->map(function ($workout) use ($locale, $muscleTranslations) {
        return [
            'id' => $workout->id,
            'name' => $workout->name,
            'description' => $workout->description,
            'muscle_groups' => array_map(function ($group) use ($locale, $muscleTranslations) {
                $key = strtolower($group); 
                if ($locale === 'lv' && isset($muscleTranslations[$key])) {
                    return $muscleTranslations[$key]; 
                }
                return $group; 
            }, $workout->muscle_groups ?? []),
        ];
    });

    return Inertia::render('Workouts/myWorkouts', [
        'workouts' => $workouts,
    ]);
}


    public function edit(Workout $workout)
    {
        $locale = app()->getLocale();

     $exercises = Exercise::orderBy('name')->get()->map(function ($ex) {
    return [
        'id' => $ex->id,
        'name' => $ex->name,
        'name_lv' => $  ex->name_lv,
        'description' => $ex->description,
        'description_lv' => $ex->description_lv,
        'muscle_group' => $ex->muscle_group,
        'muscle_group_lv' => $ex->muscle_group_lv,
        'muscle_group_key' => $ex->muscle_group,
        'image_path' => $ex->image_path,
    ];
});


        $favoriteExercises = Favorite::where('user_id', auth()->id())
            ->pluck('exercise_id')
            ->toArray();

        return Inertia::render('Workouts/Edit', [
            'workout' => $workout->load('exercises'),
            'exercises' => $exercises,
            'favoriteExercises' => $favoriteExercises,
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

    $exercisesData = collect($request->exercises)->map(function ($ex) {
        $exercise = \App\Models\Exercise::find($ex['id']); 
        return [
            'id' => $exercise->id,
            'name' => $exercise->name,
             'name_lv' => $exercise->name_lv,    
            'muscle_group' => $exercise->muscle_group,
              'muscle_group_lv' => $exercise->muscle_group_lv,
            'sets' => $ex['sets'] ?? [],
        ];
    })->toArray();

    WorkoutLog::create([
        'user_id' => auth()->id(),
        'workout_id' => $workout->id,
        'exercises' => $exercisesData,
    ]);

    return redirect()->route('workouts.start', $workout->id)
        ->with('success', 'Workout saved!');
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

    $hasCompletedToday = WorkoutLog::where('user_id', $user->id)
        ->whereDate('created_at', now()->toDateString())
        ->exists();

    return Inertia::render('Dashboard', [
        'auth' => ['user' => $user],
        'workouts' => $workouts,
        'completedLogs' => $completedLogs,
        'hasCompletedToday' => $hasCompletedToday,
    ]);
}


    public function show(Workout $workout)
{
    $workout->load('exercises');

        $latestLog = WorkoutLog::where('workout_id', $workout->id)
            ->latest()
            ->first();

    $exercises = [];
    if ($latestLog) {
        $exercises = collect($latestLog->exercises)->map(function ($ex) {
            if (!isset($ex['name']) || !isset($ex['muscle_group'])) {
                $exercise = \App\Models\Exercise::find($ex['id']);
                if ($exercise) {
                    $ex['name'] = $exercise->name;
                    $ex['muscle_group'] = $exercise->muscle_group;
                } else {
                    $ex['name'] = 'Unknown Exercise';
                    $ex['muscle_group'] = 'Unknown Muscle Group';
                }
            }
            return $ex;
        })->toArray();
    }

    return Inertia::render('Workouts/ShowWorkout', [
        'auth' => ['user' => auth()->user()],
        'workout' => $workout,
        'latest_log' => [
            'exercises' => $exercises
        ],
    ]);
}

    public function showWorkoutsForUser($userId)
{
    $user = \App\Models\User::findOrFail($userId);

    $workouts = Workout::where('user_id', $userId)->get();

    $completedLogs = WorkoutLog::where('user_id', $userId)
        ->with('workout')
        ->orderBy('created_at', 'desc')
        ->get();

    return Inertia::render('Workouts/Show', [
        'auth' => ['user' => auth()->user()],
        'profileUser' => $user,
        'workouts' => $workouts,
        'completedLogs' => $completedLogs,
    ]);
}


   public function mostTrainedMuscles()
{
    $user = auth()->user();

    $logs = \App\Models\WorkoutLog::where('user_id', $user->id)->get();

    $muscleCounts = [];

    foreach ($logs as $log) {
        foreach ($log->exercises as $ex) {
            $muscleGroup = $ex['muscle_group'] ?? null;

            if (!$muscleGroup && isset($ex['id'])) {
                $exercise = \App\Models\Exercise::find($ex['id']);
                $muscleGroup = $exercise ? $exercise->muscle_group : 'Unknown';
            }

            if (!$muscleGroup) {
                $muscleGroup = 'Unknown';
            }

            $muscleCounts[$muscleGroup] = ($muscleCounts[$muscleGroup] ?? 0) + 1;
        }
    }

    return \Inertia\Inertia::render('Profile/MuscleStats', [
        'auth' => ['user' => $user],
        'muscleCounts' => $muscleCounts,
    ]);
}


}
