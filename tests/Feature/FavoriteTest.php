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
        // Izveido jaunu lietotāju, kurš pieslēgsies sistēmai
        $user = User::factory()->create([
            'email' => 'nuno@laravel.com',
            'password' => bcrypt('password123'),
        ]);

        // Izveido vingrinājumu, kuru lietotājs varēs pievienot favorītiem
        $exercise = Exercise::create([
            'name' => 'Push Ups',
            'muscle_group' => 'Chest',
            'description' => 'Push-ups work the upper body.',
            'description_lv' => 'Atspiedieni stiprina ķermeņa augšdaļu.',
        ]);

        // norāda URL uz kuru tiks nosūtīts pieprasījums, lai pievienotu favorītiem
        $postUrl = "/exercises/{$exercise->id}/favorite";

         //pievieno vingrinājumu favorītiem
        $response = $this->actingAs($user)->post($postUrl);

        // Pārbauda, vai favorītu tabulā ir ieraksts ar lietotāja un vingrinājuma ID
        $this->assertDatabaseHas('favorites', [
            'user_id' => $user->id,
            'exercise_id' => $exercise->id,
        ]);

        //nosūta pieprasījumu vēlreiz, lai noņemtu no favorītiem 
        $this->actingAs($user)->post($postUrl);

        // Pārbauda, ka favorītu tabulā vairs nav šī ieraksta
        $this->assertDatabaseMissing('favorites', [
            'user_id' => $user->id,
            'exercise_id' => $exercise->id,
        ]);
    }
}
