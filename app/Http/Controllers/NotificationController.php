<?php

namespace App\Http\Controllers;

use App\Models\WorkoutLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
       
        $unfinishedWorkouts = WorkoutLog::where('user_id', auth()->id())
            ->whereDate('created_at', today())
            ->where('finished', false)
            ->get();

        return Inertia::render('Notifications/index', [
            'unfinishedWorkouts' => $unfinishedWorkouts,
        ]);
    }
}
