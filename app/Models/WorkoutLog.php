<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutLog extends Model
{
    use HasFactory;

    protected $fillable = ['workout_id', 'user_id', 'exercises'];

    protected $casts = [
        'exercises' => 'array', // automatically cast JSON to array
    ];

    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    public function exerciseSets()
{
    return $this->hasMany(ExerciseSet::class)->orderBy('id');
}
}
