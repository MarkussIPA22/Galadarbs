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
    // Update progress if new weight is higher
    if ($weight > $this->progress) {
        $this->progress = $weight;
    }

    // Mark task as completed if progress >= target
    if ($this->progress >= $this->target) {
        $this->completed = true;
        $this->last_completed_at = now();
        $this->streak += 1;
    }

    $this->save();
}


   


}
