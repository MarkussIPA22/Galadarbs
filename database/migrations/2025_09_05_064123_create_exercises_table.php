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
    $table->string('name');
    $table->string('name_lv')->nullable();
    $table->string('muscle_group');
    $table->string('muscle_group_lv')->nullable();
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
