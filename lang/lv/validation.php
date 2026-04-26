<?php

return [
   

    'required' => ':attribute lauks ir obligāts.',
    'string'   => ':attribute jābūt virknei (tekstam).',
    'max'      => [
        'string' => ':attribute nedrīkst pārsniegt :max rakstzīmes.',
    ],
    'min'      => [
        'string' => ':attribute jābūt vismaz :min rakstzīmes.',
        'array' => 'Jāizvēlas vismaz :min :attribute.', 
    ],

 

    'attributes' => [
        'name' => 'nosaukuma',
        'description' => 'apraksta',
        'target' => 'mērķa',
        'progress' => 'progresa',
        'muscle_groups' => 'muskuļu grupas', 
    ],
];