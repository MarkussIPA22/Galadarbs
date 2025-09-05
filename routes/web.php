<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutController;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/create-workout', function () {
    return Inertia::render('createWorkout');
})->name('workouts.create');

Route::get('/my-workouts', [WorkoutController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('workouts.index');

    Route::get('/workouts/{workout}/edit', [WorkoutController::class, 'edit'])
    ->middleware(['auth', 'verified'])
    ->name('workouts.edit');

    Route::put('/workouts/{workout}', [WorkoutController::class, 'update'])
    ->middleware(['auth', 'verified'])
    ->name('workouts.update');

Route::post('/workouts', [WorkoutController::class, 'store'])->name('workouts.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Admin/adminPanel');
    })->name('admin.dashboard');

      Route::get('/exercises/create', [ExerciseController::class, 'create']);
    Route::post('/exercises', [ExerciseController::class, 'store']);
});

Route::get('/exercises', [ExerciseController::class, 'index']); // public view

require __DIR__.'/auth.php';
