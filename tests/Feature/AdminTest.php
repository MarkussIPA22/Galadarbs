<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Exercise;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_allows_admin_to_create_an_exercise()
    {
        $admin = User::factory()->create([
            'is_admin' => 1,
            'password' => bcrypt('password123'),
        ]);

        $this->actingAs($admin);

        $exerciseData = [
            'name' => 'Push Ups',
            'name_lv' => 'Atspiedieni',
            'muscle_group' => 'Chest',
            'muscle_group_lv' => 'Krūtis',
            'description' => 'Push-ups work the upper body.',
            'description_lv' => 'Atspiedieni stiprina ķermeņa augšdaļu.',
            'video_url' => 'https://example.com/video',
        ];

        $response = $this->post('/admin/exercises', $exerciseData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('exercises', [
            'name' => 'Push Ups',
            'name_lv' => 'Atspiedieni',
        ]);
    }

    /** @test */
    public function test_it_requires_name_when_creating_an_exercise()
    {
        $admin = User::factory()->create([
            'is_admin' => 1,
            'password' => bcrypt('password123'),
        ]);

        $this->actingAs($admin);

        $exerciseData = [
            'muscle_group' => 'Chest',
            'muscle_group_lv' => 'Krūtis',
            'description' => 'Push-ups work the upper body.',
            'description_lv' => 'Atspiedieni stiprina ķermeņa augšdaļu.',
            'video_url' => 'https://example.com/video',
        ];

        $response = $this->post('/admin/exercises', $exerciseData);

        $response->assertSessionHasErrors(['name']);

        $this->assertDatabaseMissing('exercises', [
            'muscle_group' => 'Chest',
            'muscle_group_lv' => 'Krūtis',
        ]);
    }

   
}
