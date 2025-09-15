<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workout_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workout_id')->nullable()->constrained()->nullOnDelete(); // keep nullable
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // delete logs if user deleted
            $table->json('exercises'); // store sets/reps
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workout_logs');
    }
};
