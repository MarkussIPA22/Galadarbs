<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutLogController; // <-- added
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user()->load('workouts');

    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => $user,
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/create-workout', function () {
    return Inertia::render('createWorkout');
})->name('workouts.create');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/workout-logs', [WorkoutLogController::class, 'store'])->name('workout-logs.store');
});

// Workouts routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/my-workouts', [WorkoutController::class, 'index'])->name('workouts.index');
    Route::get('/workouts/{workout}/edit', [WorkoutController::class, 'edit'])->name('workouts.edit');
    Route::put('/workouts/{workout}', [WorkoutController::class, 'update'])->name('workouts.update');
    Route::post('/workouts/{workout}/complete', [WorkoutController::class, 'complete'])->name('workouts.complete');
    Route::delete('/workouts/{workout}', [WorkoutController::class, 'destroy'])->name('workouts.destroy');
    Route::get('/workouts/{workout}/start', [WorkoutController::class, 'start'])->name('workouts.start');
    Route::post('/workouts', [WorkoutController::class, 'store'])->name('workouts.store');
});

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/adminPanel');
    })->name('admin.dashboard');

    Route::get('/exercises/create', [ExerciseController::class, 'create']);
    Route::post('/exercises', [ExerciseController::class, 'store']);
});

// Public exercises view
Route::get('/exercises', [ExerciseController::class, 'index']);

require __DIR__.'/auth.php';
