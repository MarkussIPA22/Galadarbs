<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutLogController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/', fn() => redirect()->route('login'));

Route::get('/exercises', [ExerciseController::class, 'index'])->name('exercises.index');
Route::get('/exercises/{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');
Route::post('/exercises/{exercise}/favorite', [ExerciseController::class, 'toggleFavorite'])
    ->name('exercises.favorite')->middleware('auth');

Route::get('/locale/{lang}', function ($lang) {
    session(['locale' => $lang]);
    app()->setLocale($lang);
    return redirect()->back();
})->name('locale.switch');

// Authenticated
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboards
    Route::get('/dashboard', [WorkoutController::class, 'dashboard'])->name('dashboard');

    // Workouts
    Route::get('/my-workouts', [WorkoutController::class, 'index'])->name('workouts.index');
    Route::get('/workouts/create', [WorkoutController::class, 'create'])->name('workouts.create');
    Route::post('/workouts', [WorkoutController::class, 'store'])->name('workouts.store');
    Route::get('/workouts/{workout}/edit', [WorkoutController::class, 'edit'])->name('workouts.edit');
    Route::get('/workouts/start/{workout}', [WorkoutController::class, 'start'])->name('workouts.start');
    Route::put('/workouts/{workout}', [WorkoutController::class, 'update'])->name('workouts.update');
    Route::delete('/workouts/{workout}', [WorkoutController::class, 'destroy'])->name('workouts.destroy');
    Route::post('/workouts/{workout}/complete', [WorkoutController::class, 'complete'])->name('workouts.complete');

   
    Route::get('/workouts/view/{workout}', [WorkoutController::class, 'view'])->name('workouts.view');

    Route::get('/workouts/show/{workout}', [WorkoutController::class, 'showWorkoutForUser'])
        ->name('workouts.show');

    Route::get('/workouts/completed/{log}', [WorkoutController::class, 'showCompleted'])->name('workouts.completed');

    // Tasks un Logs
    Route::post('/workout-logs', [WorkoutLogController::class, 'store'])->name('workout-logs.store');
    Route::post('/tasks/{task}/update-progress', [TaskController::class, 'updateProgress'])->name('tasks.updateProgress');

    // Profils
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/update-pic', [ProfileController::class, 'updateProfilePic'])->name('profile.update.pic');

    // Citu profili
    Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/users', [ProfileController::class, 'index'])->name('users.index'); // search & list users
});

// Taski
Route::middleware(['auth'])->group(function () {
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
});

// Admins
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin', [ExerciseController::class, 'adminIndex'])->name('admin.dashboard');
    Route::get('/exercises/create', [ExerciseController::class, 'create'])->name('exercises.create');
    Route::post('/exercises', [ExerciseController::class, 'store'])->name('exercises.store');
    Route::delete('/exercises/{exercise}', [ExerciseController::class, 'destroy'])->name('exercises.destroy');
});

require __DIR__ . '/auth.php';
