<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    protected $fillable = ['sender_id', 'receiver_id', 'message'];

    // Helpful relationships for later
    public function sender(): BelongsTo {
        return $this->belongsTo(User::class, 'sender_id');
    }
}