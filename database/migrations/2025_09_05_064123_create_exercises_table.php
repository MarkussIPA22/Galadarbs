<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       Schema::create('exercises', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
    $table->string('name');
    $table->string('name_lv')->nullable();
    $table->string('muscle_group');
    $table->string('muscle_group_lv')->nullable();
    $table->string('secondary_muscles')->nullable();
    $table->string('secondary_muscles_lv')->nullable();
    $table->text('description');
    $table->text('description_lv')->nullable();
    $table->string('image_path')->nullable();
    $table->string('video_url')->nullable();
    $table->timestamps();
});
    }

    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};
