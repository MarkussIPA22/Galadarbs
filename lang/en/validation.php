<?php

return [
    'required' => 'The :attribute field is required.',
    'string'   => 'The :attribute must be a string.',
    'max'      => [
        'string' => 'The :attribute must not be greater than :max characters.',
    ],
    'min'      => [
        'string' => 'The :attribute must be at least :min characters.',
        'array'  => 'The :attribute must have at least :min items.',
    ],

   

    'attributes' => [
        'name' => 'workout name',
        'description' => 'description',
        'muscle_groups' => 'muscle groups',
    ],
];