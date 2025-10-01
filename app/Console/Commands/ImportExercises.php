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

            // Only replace /storage/ if it exists, otherwise leave path as-is
            if ($imagePath && str_starts_with($imagePath, '/storage/')) {
                $imagePath = '/' . ltrim(str_replace('/storage/', '', $imagePath), '/');
            }

            Exercise::updateOrCreate(
                ['id' => $ex['id']],
                [
                    'name'            => $ex['name'],
                    'name_lv'         => $ex['name_lv'] ?? null,
                    'muscle_group'    => $ex['muscle_group'] ?? null,
                    'muscle_group_lv' => $ex['muscle_group_lv'] ?? null,
                    'description'     => $ex['description'] ?? null,
                    'description_lv'  => $ex['description_lv'] ?? null,
                    'image_path'      => $imagePath,
                ]
            );

            $this->info("Processed exercise: {$ex['name']}");
        }

        $this->info("All exercises imported successfully!");
        return 0;
    }
}
