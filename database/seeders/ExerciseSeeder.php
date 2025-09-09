<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercise;

class ExerciseSeeder extends Seeder
{
   public function run()
{
    $exercises = json_decode(file_get_contents(database_path('seeders/data/exercises.json')), true);

    foreach ($exercises as $exercise) {
        \App\Models\Exercise::updateOrCreate(
            ['name' => $exercise['name']], // search by name
            [
                'muscle_group' => $exercise['muscle_group'],
                'description' => $exercise['description'] ?? null,
                'image_path' => $exercise['image_path'] ?? null,
            ]
        );
    }
}
}