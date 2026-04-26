<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index(User $receiver = null)
    {
        $authId = auth()->id();
        $messages = [];

        $chatUsers = User::where('id', '!=', $authId)
            ->where(function($query) use ($authId) {
                $query->whereHas('sentMessages', function($q) use ($authId) {
                    $q->where('receiver_id', $authId);
                })
                ->orWhereHas('receivedMessages', function($q) use ($authId) {
                    $q->where('sender_id', $authId);
                });
            })
            ->get();

        if ($receiver && !$chatUsers->contains('id', $receiver->id)) {
            $chatUsers->push($receiver);
        }

        if ($receiver) {
            $messages = Message::where(function($q) use ($authId, $receiver) {
                $q->where('sender_id', $authId)->where('receiver_id', $receiver->id);
            })->orWhere(function($q) use ($authId, $receiver) {
                $q->where('sender_id', $receiver->id)->where('receiver_id', $authId);
            })
            ->orderBy('created_at', 'asc')
            ->get();
        }

        return Inertia::render('Chat/Index', [
            'receiver' => $receiver,
            'initialMessages' => $messages,
            'users' => $chatUsers,
        ]);
    }

    public function send(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:2000',
            'receiverId' => 'required|exists:users,id',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiverId,
            'message' => $request->message,
        ]);

        $message->load('sender');

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['status' => 'Message stored and sent!']);
    }
}