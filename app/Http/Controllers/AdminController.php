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
        return Inertia::render('Admin/exercises', [
            'exercises' => $exercises,
        ]);
    }

    public function storeExercise(Request $request)
    {
       $request->validate([
    'name'            => 'required|unique:exercises,name',
    'name_lv'         => 'required|unique:exercises,name_lv',
    'muscle_group'    => 'required|string',
    'muscle_group_lv' => 'required|string',
    'description'     => 'nullable|string',
    'description_lv'  => 'nullable|string',
    'image'           => 'nullable|image|max:4096',
    'video_url'       => 'nullable|string',
]);


        $path = null;
        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('exercises'), $filename);
            $path = '/exercises/' . $filename;
        }

     Exercise::create([
    'name'            => $request->name,
    'name_lv'         => $request->name_lv,
    'muscle_group'    => $request->muscle_group,
    'muscle_group_lv' => $request->muscle_group_lv,
    'description'     => $request->description ?? '',
    'description_lv'  => $request->description_lv ?? '',
    'image_path'      => $path,
    'video_url'       => $request->video_url,
]);


        $exercises = Exercise::all();
        return Inertia::render('Admin/exercises', [
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
        return Inertia::render('Admin/exercises', [
            'exercises' => $exercises,
        ])->with('successMessage', 'Exercise deleted successfully!');
    }
}
