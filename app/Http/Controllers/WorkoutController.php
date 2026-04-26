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
        'is_private'=> 'boolean'
    ]);

    $workout = Workout::create([
        'user_id' => auth()->id(),
        'name' => $request->name,
        'description' => $request->description,
        'muscle_groups' => array_map(fn($g) => strtolower(trim($g)), $request->muscle_groups),
        'is_private' =>$request->boolean('is_private'),
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
    $workouts = Workout::where('user_id', auth()->id())->get()->map(function ($workout) {
        return [
            'id' => $workout->id,
            'name' => $workout->name,
            'description' => $workout->description,
            'muscle_groups' => array_map(function ($group) {
                return strtolower(trim($group)); 
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
        'name_lv' => $ex->name_lv,
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
        'locale' => app()->getLocale()
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
public function mostTrainedMuscles(Request $request)
{
    $user = auth()->user();
    $locale = app()->getLocale();

    $logs = \App\Models\WorkoutLog::where('user_id', $user->id)
        ->orderBy('created_at', 'asc')
        ->get();

    $allExerciseIds = $logs->flatMap(function ($log) {
        return collect($log->exercises)->pluck('id');
    })->unique();

    $exerciseMap = \App\Models\Exercise::whereIn('id', $allExerciseIds)
        ->get()
        ->keyBy('id');

    $muscleCounts = [];
    $personalRecords = [];
    $lifetimeTotalWeight = 0;

    foreach ($logs as $log) {
        $exercises = $log->exercises; 
        if (!$exercises) continue;

        foreach ($exercises as $ex) {
            $exId = $ex['id'] ?? null;
            $exerciseModel = $exerciseMap[$exId] ?? null;
            if (!$exerciseModel) continue;

            $displayName = ($locale === 'lv' && !empty($exerciseModel->name_lv)) 
                ? $exerciseModel->name_lv 
                : $exerciseModel->name;

            $mg = $exerciseModel->muscle_group ?? 'Other';
            $muscleCounts[$mg] = ($muscleCounts[$mg] ?? 0) + 1;

            if (isset($ex['sets'])) {
                foreach ($ex['sets'] as $set) {
                    $weight = floatval($set['weight'] ?? 0);
                    $reps = intval($set['reps'] ?? 0);
                    
                    $lifetimeTotalWeight += ($weight * $reps);

                    if ($weight > 0) {
                       if (!isset($personalRecords[$exId]) || $weight > $personalRecords[$exId]['weight']) {
    $personalRecords[$exId] = [
        'name_en' => $exerciseModel->name,    
        'name_lv' => $exerciseModel->name_lv, 
        'weight'  => $weight
    ];
}
                    }
                }
            }
        }
    }

    uasort($personalRecords, fn($a, $b) => $b['weight'] <=> $a['weight']);

    return \Inertia\Inertia::render('Profile/MuscleStats', [
        'auth' => ['user' => $user],
        'muscleCounts' => $muscleCounts,
        'personalRecords' => array_values(array_slice($personalRecords, 0, 10)),
        'lifetimeTotalWeight' => round($lifetimeTotalWeight, 2),
        'currentLocale' => $locale 
    ]);
}
}