<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'exercise_id',
        'name',
        'target',
        'progress',
        'date',
        'completed',
        'streak',
        'last_completed_at'

    ];

    protected $casts = [
      'date' => 'date',
    'last_completed_at' => 'datetime',
    'completed' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }

   

   


}
