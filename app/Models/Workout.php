<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 

class Workout extends Model
{
    use HasFactory; 

    protected $fillable = ['user_id', 'name', 'description', 'muscle_groups'];

    protected $casts = [
        'muscle_groups' => 'array',
    ];

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class);
    }

    public function logs()
    {
        return $this->hasMany(\App\Models\WorkoutLog::class);
    }
}
