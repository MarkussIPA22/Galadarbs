<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::table('exercises', function (Blueprint $table) {
        $table->string('name_lv')->nullable();
        $table->string('muscle_group_lv')->nullable();
        $table->text('description_lv')->nullable();
    });
}

public function down()
{
    Schema::table('exercises', function (Blueprint $table) {
        $table->dropColumn(['name_lv', 'muscle_group_lv', 'description_lv']);
    });
}
};
