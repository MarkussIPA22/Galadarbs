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
        'secondary_muscles',
        'secondary_muscles_lv',
        'description_lv',
        'video_url',
        'user_id',
    ];

    protected $casts = [
        'secondary_muscles' => 'array',
        'secondary_muscles_lv' => 'array',
    ];
    
    public function workouts()
    {
        return $this->belongsToMany(Workout::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
