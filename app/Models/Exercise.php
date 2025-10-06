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
        'name_lv',
        'muscle_group_lv',
        'description_lv',
        'video_url',
    ];
    
    public function workouts()
    {
        return $this->belongsToMany(Workout::class);
    }
}
