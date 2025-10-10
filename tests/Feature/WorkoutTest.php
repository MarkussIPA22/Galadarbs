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

    // Assign the POST response to $response
    $response = $this->actingAs($user)
                     ->post('/workouts', $WorkoutData);

    // Assert that the 'name' field triggers a validation error
    $response->assertSessionHasErrors(['name']);

    // Assert that no workout was created in the database
    $this->assertDatabaseMissing('workouts', [
        'description' => 'Workout Tests',
        'muscle_group' => ['Chest'],
    ]);
}

}