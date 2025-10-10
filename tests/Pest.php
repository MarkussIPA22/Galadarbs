<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

// ----------------------------------------------------
// Use traits globally in Pest
// ----------------------------------------------------
uses(Tests\TestCase::class, RefreshDatabase::class)->in('Feature');

// ----------------------------------------------------
// Expectations
// ----------------------------------------------------
expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

// ----------------------------------------------------
// Global helper functions
// ----------------------------------------------------
function something()
{
    // ..
}
