<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $exercises = Exercise::all([
            'id', 'name', 'name_lv', 'muscle_group', 'muscle_group_lv', 'image_path'
        ]);

        $task = Task::with('exercise')
            ->where('user_id', Auth::id())
            ->latest()
            ->first();

        return Inertia::render('Tasks/Index', [
            'task' => $task,
            'exercises' => $exercises,
            'auth' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'exercise_id' => 'required|exists:exercises,id',
        ]);

        $exercise = Exercise::find($request->exercise_id);

        $task = Task::create([
            'user_id' => Auth::id(),
            'exercise_id' => $exercise->id,
            'name' => $exercise->name,
            'target' => rand(500, 1000), 
            'progress' => 0,
            'completed' => false,
            'streak' => 0,
            'date' => now(),
        ]);

        $task->load('exercise'); 
        return response()->json($task);
    }

    public function updateProgress(Request $request, Task $task)
    {
        $task->progress = $request->progress ?? $task->progress;

        if ($task->progress >= $task->target) {
            $task->completed = true;
            $task->last_completed_at = now();
            $task->streak += 1;
        }

        $task->save();
        $task->load('exercise');
        return response()->json($task);
    }
}
