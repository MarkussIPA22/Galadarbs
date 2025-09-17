<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercise;

class ExerciseSeeder extends Seeder
{
    public function run()
    {
        $exercises = json_decode(file_get_contents(
            database_path('seeders/data/exercises.json')
        ), true);

        foreach ($exercises as $ex) {
            Exercise::create([
                'name'            => $ex['name'],
                'muscle_group'    => $ex['muscle_group'],
                'description'     => $ex['description'],
                'name_lv'         => $ex['name_lv'] ?? null,
                'muscle_group_lv' => $ex['muscle_group_lv'] ?? null,
                'description_lv'  => $ex['description_lv'] ?? null,
                'image_path'      => $ex['image_path'] ?? null,
            ]);
        }
    }
}
