<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function adminIndex()
    {
        $exercises = Exercise::all();
        return Inertia::render('Admin/adminPanel', [
            'exercises' => $exercises,
        ]);
    }

    public function storeExercise(Request $request)
    {
        $request->validate([
            'name'         => 'required|unique:exercises,name',
            'muscle_group' => 'required|string',
            'description'  => 'nullable|string',
            'image'        => 'nullable|image|max:4096',
            'video_url'    => 'nullable|string',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('exercises'), $filename);
            $path = '/exercises/' . $filename;
        }

        Exercise::create([
            'name'         => $request->name,
            'muscle_group' => $request->muscle_group,
            'description'  => $request->description ?? '',
            'image_path'   => $path,
            'video_url'    => $request->video_url,
        ]);

        $exercises = Exercise::all();
        return Inertia::render('Admin/adminPanel', [
            'exercises' => $exercises,
        ])->with('successMessage', 'Exercise added successfully!');
    }

    public function destroyExercise(Exercise $exercise)
    {
        if ($exercise->image_path && file_exists(public_path(ltrim($exercise->image_path, '/')))) {
            unlink(public_path(ltrim($exercise->image_path, '/')));
        }

        $exercise->delete();

        $exercises = Exercise::all();
        return Inertia::render('Admin/adminPanel', [
            'exercises' => $exercises,
        ])->with('successMessage', 'Exercise deleted successfully!');
    }
}
