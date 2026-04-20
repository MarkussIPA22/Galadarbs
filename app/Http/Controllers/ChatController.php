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
            'users' => User::where('id', '!=', $authId)->get(),
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

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['status' => 'Message stored and sent!']);
    }
}