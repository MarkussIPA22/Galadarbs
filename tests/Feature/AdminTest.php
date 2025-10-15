<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Exercise;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    
  public function test_it_allows_admin_to_create_an_exercise()
{
    // Izveido jaunu lietotāju ar admin tiesībām
    $admin = User::factory()->create([
        'is_admin' => 1,
        'password' => bcrypt('password123'), 
    ]);

    // Pieslēdzas kā šis admin lietotājs
    $this->actingAs($admin);

    // Sagatavo datus jauna vingrinājuma izveidei
    $exerciseData = [
        'name' => 'Push Ups',
        'name_lv' => 'Atspiedieni',
        'muscle_group' => 'Chest',
        'muscle_group_lv' => 'Krūtis',
        'description' => 'Push-ups work the upper body.',
        'description_lv' => 'Atspiedieni stiprina ķermeņa augšdaļu.',
        'video_url' => 'https://example.com/video',
    ];

    // Nosūta  pieprasījumu uz vingrinājumu izveides maršrutu
    $response = $this->post('/admin/exercises', $exerciseData);

    // Pārbauda, ka vingrinājums ir saglabāts datubāzē ar pareiziem laukiem
    $this->assertDatabaseHas('exercises', [
        'name' => 'Push Ups',
        'name_lv' => 'Atspiedieni',
        'video_url' => 'https://example.com/video',
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

        $response = $this->from('/admin')->post('/admin/exercises', $exerciseData);

        $response->assertRedirect('/admin'); 
        $response->assertSessionHasErrors(['name']);

        $this->assertDatabaseMissing('exercises', [
            'muscle_group' => 'Chest',
        ]);
    }


    /** @test */
    public function test_it_requires_muscleGroup_when_creating_an_exercise()
{
    $admin = User::factory()->create([
        'is_admin' => 1,
        'password' => bcrypt('password123'),
    ]);

    $this->actingAs($admin);

    $exerciseData = [
        'name' => 'Spiešanaaa',
        'name_lv' => 'Spiešana',
        'description' => 'Push-ups work the upper body.',
        'description_lv' => 'Atspiedieni stiprina ķermeņa augšdaļu.',
        'video_url' => 'https://example.com/video',
       
    ];

    $response = $this->from('/admin')->post('/admin/exercises', $exerciseData);

    $response->assertRedirect('/admin'); 
    $response->assertSessionHasErrors(['muscle_group']); 

    $this->assertDatabaseMissing('exercises', [
        'name' => 'Spiešanaaa',
    ]);
}


    /** @test */
    public function test_admin_can_add_video_when_creating_exercise()
    {
        $admin = User::factory()->create([
            'is_admin' => 1,
            'password' => bcrypt('password123'),
        ]);

        $this->actingAs($admin);

        $exerciseData = [
            'name' => 'Spiešanaaa',
            'name_lv' => 'Spiešana',
            'muscle_group' => 'Chest',
            'muscle_group_lv' => 'Krūtis',
            'description' => 'Push-ups work the upper body.',
            'description_lv' => 'Atspiedieni stiprina ķermeņa augšdaļu.',
            'video_url' => 'https://example.com/video',
        ];

        $response = $this->post('/admin/exercises', $exerciseData);

        $response->assertStatus(302)
                 ->assertSessionHas('successMessage', 'Exercise added successfully!');

        $this->assertDatabaseHas('exercises', [
            'name' => 'Spiešanaaa',
            'video_url' => 'https://example.com/video',
        ]);
    }


   

/** @test */
public function test_it_allows_admin_to_edit_a_exercise()
{
    $admin = User::factory()->create([
        'is_admin' => 1,
        'password' => bcrypt('password123'),
    ]);

    $this->actingAs($admin);

    // Create an exercise
    $exercise = Exercise::create([
        'name' => 'Push Ups',
        'name_lv' => 'Atspiedieni',
        'muscle_group' => 'Chest',
        'muscle_group_lv' => 'Krūtis',
        'description' => 'Push-ups work the upper body.',
        'description_lv' => 'Atspiedieni stiprina ķermeņa augšdaļu.',
        'video_url' => 'https://example.com/old-video',
    ]);

    // New updated data
    $updatedData = [
        'name' => 'Bench Press',
        'name_lv' => 'Soliņš Spiešana',
        'muscle_group' => 'Chest',
        'muscle_group_lv' => 'Krūtis',
        'description' => 'Bench press builds the chest and triceps.',
        'description_lv' => 'Soliņš spiešana stiprina krūtis un tricepsus.',
        'video_url' => 'https://example.com/new-video',
    ];

    $response = $this->put("/admin/exercises/{$exercise->id}", $updatedData);

    $response->assertStatus(302)
             ->assertSessionHas('successMessage', 'Exercise updated successfully!');

    $this->assertDatabaseHas('exercises', [
        'id' => $exercise->id,
        'name' => 'Bench Press',
        'name_lv' => 'Soliņš Spiešana',
        'video_url' => 'https://example.com/new-video',
    ]);

    // Assert old name is gone
    $this->assertDatabaseMissing('exercises', [
        'name' => 'Push Ups',
        'video_url' => 'https://example.com/old-video',
    ]);
}

public function test_it_allows_admin_to_delete_an_exercise()
{
    // Izveido admin lietotāju
    $admin = User::factory()->create([
        'is_admin' => 1,
        'password' => bcrypt('password123'),
    ]);

    $this->actingAs($admin);

    // Izveido vingrinājumu, ko dzēst
    $exercise = Exercise::create([
        'name' => 'Squats',
        'name_lv' => 'Pietupieni',
        'muscle_group' => 'Legs',
        'muscle_group_lv' => 'Kājas',
        'description' => 'Squats build leg strength.',
        'description_lv' => 'Pietupieni stiprina kājas.',
        'video_url' => 'https://example.com/squats-video',
    ]);

    // Nosūta DELETE pieprasījumu uz dzēšanas maršrutu
    $response = $this->delete("/admin/exercises/{$exercise->id}");

    // Pārbauda, ka notika redirect uz admin paneli un sesijā ir veiksmes ziņa
    $response->assertRedirect(route('admin.dashboard'))
             ->assertSessionHas('successMessage', 'Exercise deleted successfully!');

    // Pārbauda, ka vingrinājums vairs nav datubāzē
    $this->assertDatabaseMissing('exercises', [
        'id' => $exercise->id,
        'name' => 'Squats',
    ]);
}




}
