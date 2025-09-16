<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Favorite;


class ExerciseController extends Controller
{

   
  public function index()
{
    $locale = app()->getLocale(); // "en" or "lv"

    $exercises = Exercise::all()->map(function($ex) use ($locale) {
        return [
            'id' => $ex->id,
            'name' => $locale === 'lv' && $ex->name_lv ? $ex->name_lv : $ex->name,
            'description' => $locale === 'lv' && $ex->description_lv ? $ex->description_lv : $ex->description,
            'muscle_group' => $locale === 'lv' && $ex->muscle_group_lv ? $ex->muscle_group_lv : $ex->muscle_group,
            'image_path' => $ex->image_path,
        ];
    });

    return Inertia::render('Exercises/Index', [
        'exercises' => $exercises,
    ]);
}

public function show(Exercise $exercise)
{
    $locale = app()->getLocale();

    $isFavorite = false;
    if (auth()->check()) {
        $isFavorite = \App\Models\Favorite::where('user_id', auth()->id())
            ->where('exercise_id', $exercise->id)
            ->exists();
    }

    return Inertia::render('Exercises/Show', [
        'exercise' => [
            'id' => $exercise->id,
            'name' => $locale === 'lv' && $exercise->name_lv ? $exercise->name_lv : $exercise->name,
            'description' => $locale === 'lv' && $exercise->description_lv ? $exercise->description_lv : $exercise->description,
            'muscle_group' => $locale === 'lv' && $exercise->muscle_group_lv ? $exercise->muscle_group_lv : $exercise->muscle_group,
            'image_path' => $exercise->image_path,
        ],
        'isFavorite' => $isFavorite,
        'auth' => auth()->user()
    ]);
}

   
    public function adminIndex()
    {
        $exercises = Exercise::orderBy('name')->get();

        return Inertia::render('Admin/adminPanel', [
            'auth' => auth()->user(),
            'exercises' => $exercises,
        ]);
    }

    public function create()
    {
        return Inertia::render('Exercises/Create');
    }

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
            'description' => $request->description,
            'image_path' => $path,
            'name_lv' => $request->name_lv,
            'muscle_group_lv' => $request->muscle_group_lv,
            'description_lv' => $request->description_lv,
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

    public function toggleFavorite(Exercise $exercise)
{
    $user = auth()->user();

    $favorite = Favorite::where('user_id', $user->id)
        ->where('exercise_id', $exercise->id)
        ->first();

    if ($favorite) {
        $favorite->delete();
        return back()->with('success', 'Exercise removed from favorites.');
    }

    Favorite::create([
        'user_id' => $user->id,
        'exercise_id' => $exercise->id,
    ]);

    return back()->with('success', 'Exercise added to favorites!');
}




}
