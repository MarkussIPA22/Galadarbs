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
   public function test_it_allows_user_to_create_workout()
{
    // izveido jaunu lietotāju
    $user = User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

    // izveido treniņa datus, nosaukumu, aprakstu, muskula grupu
    $WorkoutData = [
        'name' => 'Workout',
        'description' => 'Workout Tests',
        'muscle_groups' => ['Chest'],
    ];

    // pieslēdzas kā izveidotais lietotājs, un veic pieprasījumu treniņa izveidei
    $this->actingAs($user)
         ->post('/workouts', $WorkoutData);

         //Pārbauda vai datubāzē ir ieraksts ar norādīto treniņa nosaukumu un aprakstu
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
public function test_it_requires_muscle_group_when_creating_a_workout()
{
    $user = User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

    $workoutData = [
        'name' => 'Workout Without Muscle Group',
        'description' => 'This workout has no muscle groups',
       
    ];

    $response = $this->actingAs($user)
                     ->from('/workouts/create')
                     ->post('/workouts', $workoutData);

    $response->assertRedirect('/workouts/create');

    $response->assertSessionHasErrors(['muscle_groups']);

    $this->assertDatabaseMissing('workouts', [
        'name' => 'Workout Without Muscle Group',
        'description' => 'This workout has no muscle groups',
    ]);
}


/** @test */
public function test_it_allows_user_to_edit_a_workout()
{
    $user = User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

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
        'exercises' => [], 
    ];

    $response = $this->actingAs($user)
                     ->put("/workouts/{$workout->id}", $updatedData);

    $response->assertRedirect(route('workouts.edit', $workout->id));

    $this->assertDatabaseHas('workouts', [
        'id' => $workout->id,
        'name' => 'Updated Workout',
        'description' => 'Updated Description',
    ]);

    $this->assertEquals(['Back', 'Biceps'], Workout::find($workout->id)->muscle_groups);
}

/** @test */
public function test_it_allows_user_to_delete_their_workout()
{
    $user = User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

    $workout = Workout::factory()->create([
        'user_id' => $user->id,
        'name' => 'Workout to Delete',
        'description' => 'This workout will be deleted',
        'muscle_groups' => ['Legs'],
    ]);

    $response = $this->actingAs($user)
                     ->delete("/workouts/{$workout->id}");

    $response->assertRedirect(route('workouts.index'));

    $this->assertDatabaseMissing('workouts', [
        'id' => $workout->id,
        'name' => 'Workout to Delete',
    ]);
}







}