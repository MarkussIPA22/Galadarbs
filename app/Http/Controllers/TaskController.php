<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $exercises = Exercise::all(['id', 'name', 'name_lv', 'muscle_group', 'muscle_group_lv', 'image_path']);

        return Inertia::render('Tasks/Index', [
            'exercises' => $exercises,
            'auth' => auth()->user(),
        ]);
    }
}
