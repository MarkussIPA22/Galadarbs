<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    
protected $fillable = [
    'name',
    'muscle_group',
    'description',
    'image_path',
   
];
    public function workouts()
    {
        return $this->belongsToMany(Workout::class);
    }
}
