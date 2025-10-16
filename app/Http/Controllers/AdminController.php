<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $exercises = Exercise::all();
    return Inertia::render('Admin/exercises', [
        'exercises' => $exercises,
    ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|unique:exercises,name',
        'name_lv' => 'required|string|unique:exercises,name_lv',
        'muscle_group' => 'required|string',
        'muscle_group_lv' => 'required|string',
        'description' => 'nullable|string',
        'description_lv' => 'nullable|string',
        'image' => 'nullable|image|max:4096',
        'video_url' => 'nullable|string',
    ]);

    $path = null;
    if ($request->hasFile('image')) {
        $filename = time() . '_' . $request->file('image')->getClientOriginalName();
        $request->file('image')->move(public_path('exercises'), $filename);
        $path = '/exercises/' . $filename;
    }

    
    Exercise::create([
        'name' => $validated['name'],                
        'name_lv' => $validated['name_lv'],          
        'muscle_group' => $validated['muscle_group'],
        'muscle_group_lv' => $validated['muscle_group_lv'],
        'description' => $validated['description'] ?? '',
        'description_lv' => $validated['description_lv'] ?? '',
        'image_path' => $path,
        'video_url' => $validated['video_url'] ?? null,
    ]);

    return redirect()->route('admin.dashboard')
                     ->with('successMessage', 'Exercise added successfully!');
}

    public function update(Request $request, Exercise $exercise)
    {
       $validated = $request->validate([
    'name' => 'required|string|unique:exercises,name,' . $exercise->id,
    'name_lv' => 'required|string|unique:exercises,name_lv,' .$exercise->id,
    'muscle_group' => 'required|string',
    'muscle_group_lv' => 'required|string',
    'description' => 'nullable|string',
    'description_lv' => 'nullable|string',
    'image' => 'nullable|image|max:4096',
    'video_url' => 'nullable|string',
]);

        $path = $exercise->image_path;
        if ($request->hasFile('image')) {
            if ($path && file_exists(public_path(ltrim($path, '/')))) {
                unlink(public_path(ltrim($path, '/')));
            }
            $filename = time() . '_' . $request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('exercises'), $filename);
            $path = '/exercises/' . $filename;
        }

       $exercise->update([
    'name' => $validated['name'],
    'name_lv' => $validated['name_lv'] ?? $exercise->name_lv,
    'muscle_group' => $validated['muscle_group'],
    'muscle_group_lv' => $validated['muscle_group_lv'] ?? $exercise->muscle_group_lv,
    'description' => $validated['description'] ?? '',
    'description_lv' => $validated['description_lv'] ?? $exercise->description_lv,
    'image_path' => $path,
    'video_url' => $validated['video_url'] ?? null,
]);


        return redirect()->route('admin.dashboard')->with('successMessage', 'Exercise updated successfully!');
    }

    public function destroy(Exercise $exercise)
    {
        if ($exercise->image_path && file_exists(public_path(ltrim($exercise->image_path, '/')))) {
            unlink(public_path(ltrim($exercise->image_path, '/')));
        }

        $exercise->delete();

        return redirect()->route('admin.dashboard')->with('successMessage', 'Exercise deleted successfully!');
    }

    public function edit(Exercise $exercise)
{
    return Inertia::render('Admin/EditExercise', [
        'exercise' => $exercise,
    ]);
}

}
