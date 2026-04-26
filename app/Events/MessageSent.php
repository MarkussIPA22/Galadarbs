<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel; 
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

public function __construct($message)

    {
      $this->username   = $message->sender->name; 
        $this->message    = $message->message;
        $this->receiverId = (int) $message->receiver_id;
        $this->senderId   = (int) $message->sender_id;
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