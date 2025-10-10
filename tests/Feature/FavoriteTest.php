<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Exercise;

class FavoriteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_it_allows_user_to_add_exercise_to_favorite()
    {
        $user = User::factory()->create([
            'email' => 'nuno@laravel.com',
            'password' => bcrypt('password123'),
        ]);

        $exercise = Exercise::create([
            'name' => 'Push Ups',
            'muscle_group' => 'Chest',
            'description' => 'Push-ups work the upper body.',
            'description_lv' => 'Atspiedieni stiprina ķermeņa augšdaļu.',
        ]);

        $postUrl = "/exercises/{$exercise->id}/favorite";

        // Add to favorites
        $response = $this->actingAs($user)->post($postUrl);
        $response->assertRedirect();
        $this->assertDatabaseHas('favorites', [
            'user_id' => $user->id,
            'exercise_id' => $exercise->id,
        ]);

        // Toggle again to remove
        $this->actingAs($user)->post($postUrl);
        $this->assertDatabaseMissing('favorites', [
            'user_id' => $user->id,
            'exercise_id' => $exercise->id,
        ]);
    }
}
