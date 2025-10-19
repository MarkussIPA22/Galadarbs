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

   
    public function addProgress(int $weight)
    {
       
        if ($weight > $this->progress) {
            $this->progress = $weight;
        }

      
        if ($this->progress >= $this->target) {
            $this->completed = true;

            
            if ($this->last_completed_at && $this->last_completed_at->isYesterday()) {
                $this->streak += 1;
            }
            elseif (!$this->last_completed_at || !$this->last_completed_at->isToday()) {
                $this->streak += 1;
            }
            elseif ($this->last_completed_at && $this->last_completed_at->lt(now()->subDays(1))) {
                $this->streak = 1;
            }

            $this->last_completed_at = now();
        }

        $this->save();
    }
}
