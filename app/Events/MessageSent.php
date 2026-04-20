<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel; // CRITICAL: Added this import
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $username;
    public $message;
    public $receiverId;
    public $senderId; 
    public function __construct($username, $message, $receiverId)
    {
        $this->username = $username;
        $this->message = $message;
        $this->receiverId = $receiverId;
        $this->senderId = auth()->id(); 
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat.user.' . $this->receiverId);
    }

    public function broadcastAs(): string
    {
        return 'MessageSent';
    }
}