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
    ];

    protected $casts = [
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

    // Add progress and mark completed if target reached
    public function addProgress(int $weight)
    {
        $this->progress += $weight;
        if ($this->progress >= $this->target) {
            $this->progress = $this->target;
            $this->completed = true;
        }
        $this->save();
    }
}
