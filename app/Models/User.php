<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage; 

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'weight',
        'height',
        'profile_pic' 
    ];

    protected $appends = ['profile_pic_url'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'height' => 'float', 
            'weight' => 'float',
        ];
    }

   
    public function getProfilePicUrlAttribute()
    {
        if (!$this->profile_pic) {
            return null;
        }

        return asset('storage/' . $this->profile_pic);
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function workouts()
    {
        return $this->hasMany(Workout::class);
    }
}