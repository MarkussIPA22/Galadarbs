<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    // -----------------------------
    // PUBLIC METHODS (anyone can view)
    // -----------------------------

    // Public exercise list
    public function index()
    {
        $exercises = Exercise::orderBy('name')->get();

        return Inertia::render('Exercises/Index', [
            'exercises' => $exercises,
        ]);
    }

    // Show a single exercise (public)
    public function show(Exercise $exercise)
    {
        return Inertia::render('Exercises/Show', [
            'exercise' => $exercise
        ]);
    }

    // -----------------------------
    // ADMIN METHODS (admins only)
    // -----------------------------

    // Admin panel index
    public function adminIndex()
    {
        $exercises = Exercise::orderBy('name')->get();

        return Inertia::render('Admin/adminPanel', [
            'auth' => auth()->user(),
            'exercises' => $exercises,
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('Exercises/Create');
    }

    // Store a new exercise
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:exercises,name',
            'muscle_group' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        $path = $request->hasFile('image') 
            ? $request->file('image')->store('exercises', 'public') 
            : null;

        Exercise::create([
            'name' => $request->name,
            'muscle_group' => $request->muscle_group,
            'image_path' => $path,
        ]);

        return redirect()->back()->with('success', 'Exercise added!');
    }

    // Delete an exercise
    public function destroy(Exercise $exercise)
    {
        if ($exercise->image_path && \Storage::disk('public')->exists($exercise->image_path)) {
            \Storage::disk('public')->delete($exercise->image_path);
        }

        $exercise->delete();

        return redirect()->back()->with('success', 'Exercise deleted!');
    }
}
