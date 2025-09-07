<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    public function index()
{
    $workouts = auth()->user()->workouts()->with('exercises')->get();
    $exercises = Exercise::orderBy('name')->get(); // <-- this is needed

    return Inertia::render('MyWorkouts', [
        'workouts' => $workouts,
        'exercises' => $exercises,
    ]);
}

    public function create()
    {
        return Inertia::render('Exercises/Create'); // React page
    }

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|unique:exercises,name',
        'muscle_group' => 'required|string', // <- validate muscle group
        'image' => 'nullable|image|max:2048'
    ]);

    $path = null;
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('exercises', 'public');
    }

    Exercise::create([
        'name' => $request->name,
        'muscle_group' => $request->muscle_group, // <- save muscle group
        'image_path' => $path,
    ]);

    return redirect()->back()->with('success', 'Exercise added!');
}

}
