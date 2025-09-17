<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', auth()->id())
            ->where('date', now()->toDateString())
            ->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'auth' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'target' => 'required|integer|min:1',
            'date' => 'required|date',
        ]);

        Task::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'target' => $request->target,
            'date' => $request->date,
        ]);

        return redirect()->back()->with('success', 'Task created!');
    }
}
