<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ExerciseController extends Controller
{
    private function resolveImagePath(Exercise $ex): ?string
    {
        $image = $ex->image_path ? trim($ex->image_path) : null;

        if ($image) {
            $image = str_replace('/storage/', '/exercises/', $image);

            if (!Str::startsWith($image, '/')) {
                $image = '/' . ltrim($image, '/');
            }

            if (!file_exists(public_path(ltrim($image, '/')))) {
                $image = null;
            }
        }

        if (!$image) {
            $slug = Str::slug($ex->name);
            $candidate = '/exercises/' . $slug . '.webp';
            if (file_exists(public_path(ltrim($candidate, '/')))) {
                $image = $candidate;
            }
        }

        return $image ?: null;
    }

   

    public function show(Exercise $exercise)
    {
        $locale = app()->getLocale();
        $normalizedPath = $this->resolveImagePath($exercise);

        $isFavorite = auth()->check()
            ? Favorite::where('user_id', auth()->id())
                ->where('exercise_id', $exercise->id)
                ->exists()
            : false;

        return Inertia::render('Exercises/Show', [
            'exercise' => [
                'id'           => $exercise->id,
                'name'         => $locale === 'lv' && $exercise->name_lv ? $exercise->name_lv : $exercise->name,
                'description'  => $locale === 'lv' && $exercise->description_lv ? $exercise->description_lv : $exercise->description,
                'muscle_group' => $locale === 'lv' && $exercise->muscle_group_lv ? $exercise->muscle_group_lv : $exercise->muscle_group,
                'image_path'   => $normalizedPath,
                'video_url'    => $exercise->video_url,
            ],
            'isFavorite' => $isFavorite,
            'auth'       => auth()->user(),
        ]);
    }

   public function store(Request $request)
{
    $request->validate([
        'name'         => 'required|unique:exercises,name',
        'muscle_group' => 'required|string',
        'image'        => 'nullable|image|max:4096',
        'video_url'    => 'nullable|string',
    ]);

    $path = null;

    if ($request->hasFile('image')) {
        $filename = $request->file('image')->getClientOriginalName();
        $request->file('image')->move(public_path('exercises'), $filename);
        $path = '/exercises/' . $filename;
    }

    $exercise = Exercise::create([
        'name'         => $request->name,
        'muscle_group' => $request->muscle_group,
        'image_path'   => $path,
        'video_url'    => $request->video_url,
    ]);

    return response()->json(['exercise' => $exercise]);
}


    public function destroy(Exercise $exercise)
    {
        if ($exercise->image_path && file_exists(public_path(ltrim($exercise->image_path, '/')))) {
            unlink(public_path(ltrim($exercise->image_path, '/')));
        }

        $exercise->delete();

        return redirect()->back()->with('success', 'Exercise deleted!');
    }

    public function toggleFavorite(Exercise $exercise)
    {
        $user = auth()->user();
        $favorite = Favorite::where('user_id', $user->id)->where('exercise_id', $exercise->id)->first();

        if ($favorite) {
            $favorite->delete();
            return back()->with('success', 'Exercise removed from favorites.');
        }

        Favorite::create([
            'user_id'     => $user->id,
            'exercise_id' => $exercise->id,
        ]);

        return back()->with('success', 'Exercise added to favorites!');
    }
}
