<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_user_can_login_with_correct_credentials()
    {
        //izveido jaunu lietotāju 
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => bcrypt('password123'),
        ]);

        //Pieslēdzas ar izveidotā lietotāja datiem
        $response = $this->post('/login', [
            'email' => 'testuser@example.com',
            'password' => 'password123',
        ]);

        //Pārbauda vai lietotājs ir tikts pārvirzīts uz /dashboard lapu pēc pieslēgšanās
        $response->assertRedirect('/dashboard'); 

    }

    /** @test */
    public function test_user_cannot_login_with_incorrect_password()
    {
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->from('/login')->post('/login', [
            'email' => 'testuser@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertRedirect('/login'); // redirect back to login
        $response->assertSessionHasErrors('email'); // Laravel puts error under 'email'
        $this->assertGuest(); // user is not logged in
    }

    /** @test */
    public function test_email_and_password_are_required_to_login()
    {
        $response = $this->from('/login')->post('/login', []);

        $response->assertRedirect('/login');
        $response->assertSessionHasErrors(['email', 'password']);
        $this->assertGuest();
    }

    /** @test */
    public function test_authenticated_user_is_redirected_from_login_page()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/login')
            ->assertRedirect('/dashboard'); 
    }

     /** @test */
    public function test_invalid_email_shows_validation_error()
    {
        $response = $this->from('/login')->post('/login', [
            'email' => 'notanemail',
            'password' => 'password123',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }


}
