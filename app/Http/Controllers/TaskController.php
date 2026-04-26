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
    $userId = Auth::id();

    $task = Task::with('exercise')
        ->where('user_id', $userId)
        ->latest()
        ->first();

    if (!$task) {
        $randomExercise = Exercise::inRandomOrder()->first();

        if ($randomExercise) {
            $randomTarget = rand(8, 20) * 5; 

            $task = Task::create([
                'user_id' => $userId,
                'exercise_id' => $randomExercise->id,
                'name' => $randomExercise->name,
                'target' => $randomTarget,
                'progress' => 0,
                'completed' => false,
                'streak' => 0,
                'date' => now(),
            ]);
            
            $task->load('exercise');
        }
    }

    return Inertia::render('Tasks/Index', [
        'task' => $task,
        'auth' => [
            'user' => auth()->user(), 
        ],
    ]);
}

    public function store(Request $request)
{
    $request->validate([
        'exercise_id' => 'required|exists:exercises,id',
        'target' => 'required|integer|min:1',
    ]);

    $exercise = Exercise::find($request->exercise_id);

    $task = Task::create([
        'user_id' => Auth::id(),
        'exercise_id' => $exercise->id,
        'name' => $exercise->name,
        'target' => $request->target,
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

    public function destroy(Task $task)
{
    $this->authorize('delete', $task);
    $task->delete();

    return response()->json(['message' => 'Task deleted']);
}

}
