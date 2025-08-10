<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_send_verification_code_endpoint()
    {
        Mail::fake();
        
        $response = $this->postJson('/api/email/send-verification-code', [
            'email' => 'test@example.com'
        ]);
        
        $response->assertStatus(200);
        Mail::assertSent(\App\Mail\VerificationCode::class);
    }

    public function test_verify_email_with_correct_code()
    {
        $user = User::factory()->create(['email_verified_at' => null]);
        
        $response = $this->postJson('/api/email/verify', [
            'email' => $user->email,
            'code' => '123456' // Use actual verification logic
        ]);
        
        $response->assertStatus(200);
    }

    public function test_rate_limiting_on_verification_endpoints()
    {
        // Test rate limiting (5 requests per minute for send)
        for ($i = 0; $i < 6; $i++) {
            $response = $this->postJson('/api/email/send-verification-code', [
                'email' => 'test@example.com'
            ]);
        }
        
        $this->assertEquals(429, $response->getStatusCode());
    }
}
