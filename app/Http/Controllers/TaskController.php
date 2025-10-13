<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
{
    $exerciseName = $request->query('exercise');

    $tasks = Task::where('user_id', auth()->id())
        ->where('date', now()->toDateString())
        ->when($exerciseName, function($query, $exerciseName) {
            $query->whereHas('exercise', function($q) use ($exerciseName) {
                $q->whereRaw('LOWER(name) = ?', [strtolower($exerciseName)]);
            });
        })
        ->with('exercise')
        ->get();

    $exercises = \App\Models\Exercise::all(['id', 'name']);

    return Inertia::render('Tasks/Index', [
        'tasks' => $tasks,
        'exercises' => $exercises,
        'auth' => auth()->user(),
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'exercise_id' => 'required|exists:exercises,id',
            'target'      => 'required|integer|min:1',
            'date'        => 'required|date',
        ]);

       Task::create([
    'user_id'     => auth()->id(),
    'exercise_id' => $request->exercise_id,
    'name'        => \App\Models\Exercise::find($request->exercise_id)->name,
    'target'      => $request->target,
    'date'        => $request->date,
]);


        return redirect()->back()->with('success', 'Task created!');
    }

   public function updateProgress(Request $request, Task $task)
{
    $request->validate([
        'progress' => 'required|integer|min:1',
    ]);

    $task->addProgress($request->progress);

    if ($task->progress >= $task->target && !$task->completed) {
        $task->completed = true;

        if ($task->last_completed_at) {
            $yesterday = now()->subDay()->toDateString();
            if ($task->last_completed_at->toDateString() == $yesterday) {
                $task->streak++;
            } else {
                $task->streak = 1; 
            }
        } else {
            $task->streak = 1;
        }

        $task->last_completed_at = now();
    }

    $task->save();

    return response()->json(['success' => true, 'task' => $task]);
}

}
