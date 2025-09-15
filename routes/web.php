<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutLogController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ---------------------
// Public routes
// ---------------------

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Public exercise pages (anyone can view, logged in or not)
Route::get('/exercises', [ExerciseController::class, 'index'])->name('exercises.index');
Route::get('/exercises/{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');

// ---------------------
// Authenticated routes
// ---------------------

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [WorkoutController::class, 'dashboard'])->name('dashboard');

    // Workouts
    Route::get('/my-workouts', [WorkoutController::class, 'index'])->name('workouts.index');
   
Route::get('/workouts/create', [WorkoutController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('workouts.create');

    Route::get('/workouts/{workout}/edit', [WorkoutController::class, 'edit'])->name('workouts.edit');
    Route::put('/workouts/{workout}', [WorkoutController::class, 'update'])->name('workouts.update');
    Route::post('/workouts/{workout}/complete', [WorkoutController::class, 'complete'])->name('workouts.complete');
    Route::delete('/workouts/{workout}', [WorkoutController::class, 'destroy'])->name('workouts.destroy');
    Route::get('/workouts/{workout}/start', [WorkoutController::class, 'start'])->name('workouts.start');
    Route::post('/workouts', [WorkoutController::class, 'store'])->name('workouts.store');

    // Workout logs
    Route::post('/workout-logs', [WorkoutLogController::class, 'store'])->name('workout-logs.store');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ---------------------
// Admin-only routes
// ---------------------

Route::middleware(['auth', AdminMiddleware::class])->group(function () {

    // Admin panel
    Route::get('/admin', [ExerciseController::class, 'adminIndex'])->name('admin.dashboard');

    // Exercises management
    Route::get('/exercises/create', [ExerciseController::class, 'create'])->name('exercises.create');
    Route::post('/exercises', [ExerciseController::class, 'store'])->name('exercises.store');
    Route::delete('/exercises/{exercise}', [ExerciseController::class, 'destroy'])->name('exercises.destroy');
});

require __DIR__.'/auth.php';
