<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class AdminDeleteAccountTest extends TestCase
{
    use RefreshDatabase;

    protected function admin(): User
    {
        return User::factory()->create([
            'role' => 'admin',
            'account_type' => 'admin',
            'user_role_id' => 1,
        ]);
    }

    protected function user(array $attrs = []): User
    {
        return User::factory()->create(array_merge([
            'role' => 'user',
            'account_type' => 'user',
            'user_role_id' => 2,
        ], $attrs));
    }

    public function test_non_admin_cannot_delete()
    {
        $actor = $this->user();
        $victim = $this->user();

        $this->actingAs($actor, 'sanctum')
            ->postJson('/api/admin/user/delete', ['user_id' => $victim->id])
            ->assertStatus(403);
    }

    public function test_admin_cannot_delete_admin_or_self()
    {
        $admin = $this->admin();
        $otherAdmin = $this->admin();

        $this->actingAs($admin, 'sanctum')
            ->postJson('/api/admin/user/delete', ['user_id' => $otherAdmin->id])
            ->assertStatus(422);

        $this->actingAs($admin, 'sanctum')
            ->postJson('/api/admin/user/delete', ['user_id' => $admin->id])
            ->assertStatus(422);
    }

    public function test_admin_can_delete_regular_user_then_create_new_one()
    {
        $admin = $this->admin();
        $victim = $this->user(['email' => 'delete_me@example.com']);

        $this->actingAs($admin, 'sanctum')
            ->postJson('/api/admin/user/delete', ['user_id' => $victim->id])
            ->assertOk();

        $this->assertDatabaseMissing('users', ['id' => $victim->id]);

        // reuse existing register endpoint to ensure new accounts still work
        $payload = [
            'name' => 'New User',
            'email' => 'nhaimoun@gmail.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];
        $this->postJson('/api/register/user', $payload)->assertStatus(200);
        $this->assertDatabaseHas('users', ['email' => 'nhaimoun@gmail.com']);
    }
}
