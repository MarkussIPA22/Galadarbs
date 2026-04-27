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

        return $image ?: null;
    }

    private function decodeJsonArray($value): array
    {
        if (is_array($value)) {
            return $value;
        }
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            return is_array($decoded) ? $decoded : [];
        }
        return [];
    }

   public function show(Request $request, Exercise $exercise)
    {
        $normalizedPath = $this->resolveImagePath($exercise);

        $isFavorite = auth()->check()
            ? Favorite::where('user_id', auth()->id())
                ->where('exercise_id', $exercise->id)
                ->exists()
            : false;

        $relatedExercises = Exercise::where('muscle_group', $exercise->muscle_group)
            ->where('id', '!=', $exercise->id)
            ->where(function ($query) {
                $query->whereNull('user_id')
                      ->orWhere('user_id', auth()->id());
            })
            ->take(3)
            ->get()
            ->map(function ($ex) {
                return [
                    'id'              => $ex->id,
                    'name'            => $ex->name,
                    'name_lv'         => $ex->name_lv,
                    'muscle_group'    => $ex->muscle_group,
                    'muscle_group_lv' => $ex->muscle_group_lv,
                    'image_path'      => $this->resolveImagePath($ex),
                ];
            });

        return Inertia::render('Exercises/Show', [
            'exercise' => [
                'id'                    => $exercise->id,
                'name'                  => $exercise->name,
                'name_lv'               => $exercise->name_lv,
                'description'           => $exercise->description,
                'description_lv'        => $exercise->description_lv,
                'muscle_group'          => $exercise->muscle_group,
                'muscle_group_lv'       => $exercise->muscle_group_lv,
                'secondary_muscles'     => $this->decodeJsonArray($exercise->secondary_muscles),
                'secondary_muscles_lv'  => $this->decodeJsonArray($exercise->secondary_muscles_lv),
                'image_path'            => $normalizedPath,
                'video_url'             => $exercise->video_url,
            ],
            'relatedExercises' => $relatedExercises,
            'isFavorite'       => $isFavorite,
            'workout_id'       => $request->query('workout_id'), // Captures ?workout_id=X from URL
            'auth'             => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'muscle_group' => 'required|string',
            'description'  => 'nullable|string',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file     = $request->file('image');
            $fileName = time() . '_' . Str::slug($validated['name']) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('exercises/custom'), $fileName);
            $imagePath = '/exercises/custom/' . $fileName;
        }

        Exercise::create([
            'name'         => $validated['name'],
            'muscle_group' => $validated['muscle_group'],
            'description'  => $validated['description'] ?? '',
            'image_path'   => $imagePath,
            'user_id'      => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Custom exercise created!');
    }

    public function destroy(Exercise $exercise)
    {
        if ($exercise->user_id !== auth()->id()) {
            abort(403, 'You cannot delete this exercise.');
        }

        if ($exercise->image_path && file_exists(public_path(ltrim($exercise->image_path, '/')))) {
            unlink(public_path(ltrim($exercise->image_path, '/')));
        }

        $exercise->delete();

        return redirect()->back()->with('success', 'Exercise deleted!');
    }

    public function toggleFavorite(Exercise $exercise)
    {
        $user     = auth()->user();
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