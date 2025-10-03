<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Exercise;

class ImportExercises extends Command
{
    protected $signature = 'import:exercises {jsonFile=exercises.json}';
    protected $description = 'Import exercises from a JSON file and store image paths';

    public function handle()
    {
        $jsonFile = $this->argument('jsonFile');
        $filePath = base_path('database/seeders/data/' . $jsonFile);

        if (!file_exists($filePath)) {
            $this->error("File not found: $filePath");
            return 1;
        }

        $exercises = json_decode(file_get_contents($filePath), true);

        if (!$exercises) {
            $this->error("Invalid JSON in $filePath");
            return 1;
        }

        foreach ($exercises as $ex) {
            $imagePath = $ex['image_path'] ?? null;

            if ($imagePath && str_starts_with($imagePath, '/storage/')) {
                $imagePath = '/' . ltrim(str_replace('/storage/', '', $imagePath), '/');
            }

            // Use firstOrNew to preserve ID
            $exercise = Exercise::firstOrNew(['id' => $ex['id']]);

            $exercise->name            = $ex['name'];
            $exercise->name_lv         = $ex['name_lv'] ?? null;
            $exercise->muscle_group    = $ex['muscle_group'] ?? null;
            $exercise->muscle_group_lv = $ex['muscle_group_lv'] ?? null;
            $exercise->description     = $ex['description'] ?? null;
            $exercise->description_lv  = $ex['description_lv'] ?? null;
            $exercise->image_path      = $imagePath;

            $exercise->save();

            $this->info("Processed exercise: {$ex['name']}");
        }

        $this->info("All exercises imported successfully!");
        return 0;
    }
}
