<?php

namespace App\Models;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutLog extends Model
{
    use HasFactory;

    protected $fillable = ['workout_id', 'user_id', 'exercises'];

    protected $casts = [
        'exercises' => 'array', // JSON field: [{name, weight, reps}, ...]
    ];

    // Relationship to parent workout
    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    // Relationship to exercise sets
    public function exerciseSets()
    {
        return $this->hasMany(ExerciseSet::class);
    }

    // Automatically update tasks when a workout log is saved
    public function updateTasks()
    {
        foreach ($this->exercises as $exercise) {
            $exerciseName = strtolower($exercise['name']); // case-insensitive
            $totalWeight = $exercise['weight'] * $exercise['reps'];

            $tasks = Task::where('user_id', $this->user_id)
                ->where('date', now()->toDateString())
                ->whereRaw('LOWER(name) = ?', [$exerciseName])
                ->get();

            foreach ($tasks as $task) {
                $task->addProgress($totalWeight);
            }
        }
    }
}
