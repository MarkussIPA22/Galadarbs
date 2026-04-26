<?php

use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutLogController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\OnboardingController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
});

// Exercises
Route::get('/exercise-list', [ExerciseController::class, 'index'])->name('exercises.index');
Route::get('/exercise-details/{exercise}', [ExerciseController::class, 'show'])->name('exercises.show');
Route::post('/custom-exercises', [ExerciseController::class, 'store'])->name('exercises.store');

Route::post('/exercises/{exercise}/favorite', [ExerciseController::class, 'toggleFavorite'])
    ->name('exercises.favorite')
    ->middleware('auth');

Route::delete('/exercises/{exercise}', [ExerciseController::class, 'destroy'])
    ->name('exercises.destroy')
    ->middleware('auth');

Route::get('/locale/{lang}', function ($lang) {
    if (!in_array($lang, ['en', 'lv'])) abort(400); 
    session(['locale' => $lang]);
    app()->setLocale($lang);

    if (request()->wantsJson()) {
        return response()->json(['status' => 'success']);
    }

    return redirect()->back();
})->name('locale.switch');

Route::middleware(['auth', 'verified'])->group(function () {

    

    // ── Dashboard ───────────────────────────────────────────────────────────
    Route::get('/dashboard', [WorkoutController::class, 'dashboard'])->name('dashboard');

    Route::get('/Max/Calculate', function () {
        return Inertia::render('Max/Calculate');
    })->name('max.calculate');

    // ── Workouts ────────────────────────────────────────────────────────────
    Route::get('/my-workouts', [WorkoutController::class, 'index'])->name('workouts.index');
    Route::get('/workouts/create', [WorkoutController::class, 'create'])->name('workouts.create');
    Route::post('/workouts', [WorkoutController::class, 'store'])->name('workouts.store');
    Route::get('/workouts/{workout}/edit', [WorkoutController::class, 'edit'])->name('workouts.edit');
    Route::get('/workouts/start/{workout}', [WorkoutController::class, 'start'])->name('workouts.start');
    Route::put('/workouts/{workout}', [WorkoutController::class, 'update'])->name('workouts.update');
    Route::delete('/workouts/{workout}', [WorkoutController::class, 'destroy'])->name('workouts.destroy');
    Route::post('/workouts/{workout}/complete', [WorkoutController::class, 'complete'])->name('workouts.complete');

    Route::get('/workouts/{workout}', [WorkoutController::class, 'show'])->name('workouts.show');
    Route::get('/workouts/user/{user}', [WorkoutController::class, 'showWorkoutsForUser'])->name('workouts.showUser');
    Route::get('/workouts/completed/{log}', [WorkoutController::class, 'showCompleted'])->name('workouts.completed');

    // ── Stats ───────────────────────────────────────────────────────────────
    Route::get('/muscles/stats', [WorkoutController::class, 'mostTrainedMuscles'])->name('muscles.stats');

    // ── Logs ────────────────────────────────────────────────────────────────
    Route::post('/workout-logs', [WorkoutLogController::class, 'store'])->name('workout-logs.store');
    Route::post('/workout-logs/analyze-latest', [WorkoutLogController::class, 'analyzeLatest'])
        ->name('workout-logs.analyze-latest');

    // ── Tasks ───────────────────────────────────────────────────────────────
    Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
    Route::put('/tasks/{task}/progress', [TaskController::class, 'updateProgress'])->name('tasks.updateProgress');
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');

    // ── Profile ─────────────────────────────────────────────────────────────
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/update-pic', [ProfileController::class, 'updateProfilePic'])->name('profile.update.pic');
    Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/users', [ProfileController::class, 'index'])->name('users.index');

    // ── Chat ────────────────────────────────────────────────────────────────
 Route::middleware(['auth', 'verified'])->group(function () {
    // The main chat page (no user selected)
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    
    // Chatting with a specific user
    Route::get('/chat/{receiver}', [ChatController::class, 'index'])->name('chat.with');
    
    // Sending a message
    Route::post('/chat/send', [ChatController::class, 'send'])->name('chat.send');
});
    // ── Gyms ────────────────────────────────────────────────────────────────
    Route::get('/gyms', function () {
        return Inertia::render('Gyms/Index');
    })->name('gyms.index');
    Route::get('/gyms/by-address', [GoogleController::class, 'gymsByAddress']);
});

// ── Admin ────────────────────────────────────────────────────────────────────
Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/exercises/{exercise}/edit', [AdminController::class, 'edit'])->name('admin.exercises.edit');
    Route::post('/admin/exercises', [AdminController::class, 'store'])->name('admin.exercises.store');
    Route::put('/admin/exercises/{exercise}', [AdminController::class, 'update'])->name('admin.exercises.update');
    Route::delete('/admin/exercises/{exercise}', [AdminController::class, 'destroy'])->name('admin.exercises.destroy');
});

// ── Public API ───────────────────────────────────────────────────────────────
Route::get('/api/nearby-gyms', [GoogleController::class, 'gyms']);

require __DIR__ . '/auth.php';