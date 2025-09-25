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

   
    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    public function exerciseSets()
    {
        return $this->hasMany(ExerciseSet::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function updateTasks()
{
    foreach ($this->exercises as $exercise) {
        $exerciseModel = \App\Models\Exercise::find($exercise['id']);
        if (!$exerciseModel) continue;

        $exerciseName = strtolower($exerciseModel->name); // ✅ get name from DB

        foreach ($exercise['sets'] as $set) {
            $totalWeight = ($set['weight'] ?? 0) * ($set['reps'] ?? 0);

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

}
