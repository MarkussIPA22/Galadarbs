<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Workout;

class WorkoutTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
   public function it_allows_user_to_create_workout()
{
    $user = User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

    $WorkoutData = [
        'name' => 'Workout',
        'description' => 'Workout Tests',
        'muscle_groups' => ['Chest'],
    ];

    $this->actingAs($user)
         ->post('/workouts', $WorkoutData)
         ->assertStatus(302); 

    $this->assertDatabaseHas('workouts', [
        'name' => 'Workout',
        'description' => 'Workout Tests',
    ]);

}

public function test_it_requires_name_when_creating_an_workout()
{
    $user = User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

    $WorkoutData = [
        'description' => 'Workout Tests',
        'muscle_groups' => ['Chest'],
    ];

    $response = $this->actingAs($user)
                     ->post('/workouts', $WorkoutData);

    $response->assertSessionHasErrors(['name']);

    $this->assertDatabaseMissing('workouts', [
        'description' => 'Workout Tests',
        'muscle_group' => ['Chest'],
    ]);
}

/** @test */
public function test_it_allows_user_to_edit_a_workout()
{
    // Create a user
    $user = User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

    // Create a workout for that user
    $workout = Workout::factory()->create([
        'user_id' => $user->id,
        'name' => 'Original Workout',
        'description' => 'Original Description',
        'muscle_groups' => ['Chest'],
    ]);

    $updatedData = [
        'name' => 'Updated Workout',
        'description' => 'Updated Description',
        'muscle_groups' => ['Back', 'Biceps'],
        'exercises' => [], // optional, no exercises attached
    ];

    // Acting as the user, send PUT request to update workout
    $response = $this->actingAs($user)
                     ->put("/workouts/{$workout->id}", $updatedData);

    // Assert the user is redirected back to edit page
    $response->assertRedirect(route('workouts.edit', $workout->id));

    // Assert the database has updated values
    $this->assertDatabaseHas('workouts', [
        'id' => $workout->id,
        'name' => 'Updated Workout',
        'description' => 'Updated Description',
    ]);

    // Optional: Assert muscle_groups were updated
    $this->assertEquals(['Back', 'Biceps'], Workout::find($workout->id)->muscle_groups);
}




}