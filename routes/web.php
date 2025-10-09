<?php

use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutLogController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 


Route::get('/', fn() => redirect()->route('login'));

// Exercises 
Route::get('/exercises', [ExerciseController::class, 'index'])->name('exercises.index');
Route::get('/exercises/{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');
Route::post('/exercises/{exercise}/favorite', [ExerciseController::class, 'toggleFavorite'])
    ->name('exercises.favorite')->middleware('auth');

Route::get('/locale/{lang}', function ($lang) {
    session(['locale' => $lang]);
    app()->setLocale($lang);
    return redirect()->back();
})->name('locale.switch');

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
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

    // Muscle stats
    Route::get('/muscles/stats', [WorkoutController::class, 'mostTrainedMuscles'])
        ->name('muscles.stats');

    Route::get('/workouts/{workout}', [WorkoutController::class, 'show'])->name('workouts.show');

    // Show all workouts for a specific user
    Route::get('/workouts/user/{user}', [WorkoutController::class, 'showWorkoutsForUser'])
        ->name('workouts.showUser');

    // Completed workout logs
    Route::get('/workouts/completed/{log}', [WorkoutController::class, 'showCompleted'])
        ->name('workouts.completed');

        Route::get('/max/calculate', function () {
    return Inertia::render('Max/Calculate');
})->name('max.calculate');

    // Tasks & logs
    Route::post('/workout-logs', [WorkoutLogController::class, 'store'])->name('workout-logs.store');
    Route::post('/tasks/{task}/update-progress', [TaskController::class, 'updateProgress'])->name('tasks.updateProgress');
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/update-pic', [ProfileController::class, 'updateProfilePic'])->name('profile.update.pic');

    // profiles
    Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/users', [ProfileController::class, 'index'])->name('users.index'); 
});

// Admin routes
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin', [AdminController::class, 'adminIndex'])->name('admin.dashboard');

    // Add/delete admin
    Route::post('/admin/exercises', [AdminController::class, 'storeExercise'])
        ->name('admin.exercises.store');
    Route::delete('/admin/exercises/{exercise}', [AdminController::class, 'destroyExercise'])
        ->name('admin.exercises.destroy');
        
        Route::get('/admin/exercises/{exercise}/edit', [AdminController::class, 'edit'])
    ->name('admin.exercises.edit');


    Route::post('/admin/exercises/{exercise}/update', [AdminController::class, 'update'])->name('admin.exercises.update');

});

// Notifications
Route::middleware(['auth'])->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])
        ->name('notifications.index');
});

require __DIR__ . '/auth.php';
