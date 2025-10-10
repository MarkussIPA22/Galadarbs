<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows a user to log in with correct credentials', function () {
    $user = User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

    $response = $this->post('/login', [
        'email' => 'nuno@laravel.com',
        'password' => 'password123',
    ]);

    $response->assertRedirect('/dashboard');
    $this->assertAuthenticatedAs($user);
});

it('shows validation errors when email and password are missing', function () {
    $response = $this->post('/login', []);

    $response->assertSessionHasErrors(['email', 'password']);
    $this->assertGuest(); 
});

it('shows validation error when email is invalid', function () {
    $response = $this->post('/login', [
        'email' => 'notanemail',
        'password' => 'password123',
    ]);

    $response->assertSessionHasErrors(['email']);
    $this->assertGuest();
});


it('does not log in with incorrect password', function () {
    User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => bcrypt('password123'),
    ]);

    $response = $this->post('/login', [
        'email' => 'nuno@laravel.com',
        'password' => 'wrongpassword',
    ]);

    $response->assertSessionHasErrors(); 
    $this->assertGuest();
});
