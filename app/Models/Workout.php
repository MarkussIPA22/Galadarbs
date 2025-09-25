    <?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Model;

    class Workout extends Model
    {
        protected $fillable = ['user_id', 'name', 'description', 'muscle_groups'];

        protected $casts = [
            'muscle_groups' => 'array',
        ];

        public function exercises()
        {
            return $this->belongsToMany(Exercise::class);
        }

        public function logs()
    {
        return $this->hasMany(\App\Models\WorkoutLog::class);
    }
    }

