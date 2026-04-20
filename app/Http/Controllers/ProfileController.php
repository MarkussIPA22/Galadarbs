<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Models\Workout;
use App\Models\WorkoutLog;
use App\Models\Task;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    
    public function onboarding(): Response
    {
        return Inertia::render('Profile/Onboarding');
    }

    
    public function storePreferences(Request $request): RedirectResponse
    {
        $request->validate([
            'goal' => 'required|string',
            'frequency' => 'required|integer|min:1|max:7',
            'location' => 'required|string',
        ]);

        $user = auth()->user();

        $user->update([
            'fitness_goal' => $request->goal,
            'frequency' => $request->frequency,
            'location' => $request->location,
            'has_completed_onboarding' => true
        ]);

        if ($request->goal === 'mass' && $request->location === 'gym') {
            $massProgram = Workout::where('name', 'Mass Gain Starter')->first();
            
            if ($massProgram) {
                $user->workouts()->attach($massProgram->id);
            }
        }

        return redirect()->route('dashboard')->with('success', 'Welcome aboard!');
    }

    
    public function index(Request $request): Response
    {
        $query = $request->input('q');

        $users = User::query()
            ->when($query, fn($q) => $q->where('name', 'like', "%{$query}%"))
            ->select('id', 'name', 'profile_pic')
            ->paginate(10)
            ->appends(['q' => $query]);

        return Inertia::render('Profile/Users', [
            'users' => $users,
            'query' => $query,
        ]);
    }

  
    public function edit(Request $request): Response
    {
        $user = $request->user();

        $tasks = Task::where('user_id', $user->id)
            ->where('completed', true)
            ->orderBy('last_completed_at', 'desc')
            ->get(['id', 'name', 'streak', 'last_completed_at']);

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'height' =>$user->height,
                'weight' =>$user->weight,
                'profile_pic_url' => $user->profile_pic
                    ? asset('storage/' . $user->profile_pic)
                    : null,
            ],
            'auth' => [
                'user' => $user,
            ],
            'tasks' => $tasks->toArray(), 
        ]);
    }


    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }


    public function updateProfilePic(Request $request): RedirectResponse
    {
        $request->validate([
            'profile_pic' => ['required', 'image', 'max:2048'], 
        ]);

        $user = $request->user();
        $path = $request->file('profile_pic')->store('profile-pics', 'public');
        $user->profile_pic = $path;
        $user->save();

        return redirect()->back()->with('success', 'Profile picture updated!');
    }

   public function show(User $user): Response
{
    $isOwner = auth()->check() && auth()->id() === $user->id;

    $workouts = Workout::where('user_id', $user->id)
        ->select('id', 'name', 'is_private') 
        ->when(!$isOwner, function ($query) {
            return $query->where('is_private', false);
        })
        ->get();

    $completedLogs = WorkoutLog::where('user_id', $user->id)
        ->with(['workout' => function ($query) {
            $query->select('id', 'name', 'is_private');
        }])
        ->whereHas('workout', function ($query) use ($isOwner) {
            if (!$isOwner) {
                $query->where('is_private', false);
            }
        })
        ->orderBy('created_at', 'desc')
        ->take(10)
        ->get(['id', 'workout_id', 'created_at']);

    $tasks = Task::where('user_id', $user->id)
        ->where('completed', true)
        ->where('streak', '>', 0)
        ->orderBy('last_completed_at', 'desc')
        ->get(['id', 'name', 'streak', 'last_completed_at']);

    return Inertia::render('Profile/Show', [
        'profileUser' => [
            'id' => $user->id,
            'name' => $user->name,
            'profile_pic_url' => $user->profile_pic
                ? asset('storage/' . $user->profile_pic)
                : null,
        ],
        'workouts' => $workouts->toArray(),
        'completedLogs' => $completedLogs->toArray(),
        'tasks' => $tasks->toArray(),
        'auth' => [
            'user' => auth()->user(),
        ],
        'isOwner' => $isOwner, 
    ]);
}

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['password' => ['required', 'current_password']]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}