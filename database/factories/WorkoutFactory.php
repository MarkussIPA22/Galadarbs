<?php

namespace Database\Factories;

use App\Models\Workout;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkoutFactory extends Factory
{
    protected $model = Workout::class;

    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(), // Create a user if none exists
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'muscle_groups' => ['Chest', 'Back'], // default array
        ];
    }
}
