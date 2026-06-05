<?php

namespace Tests\Feature;

use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactTest extends TestCase
{
    public function test_contact_form_sends_email_to_sender_and_business(): void
    {
        Mail::fake();

        $payload = [
            'first_name' => 'Juan',
            'last_name' => 'Pérez',
            'email' => 'juan@example.com',
            'phone' => '3001234567',
            'message' => 'Quisiera información sobre los tours.',
        ];

        $response = $this->postJson(route('contact.store'), $payload);

        $response->assertOk()
            ->assertJson(['status' => true]);

        Mail::assertSent(ContactMessage::class, function (ContactMessage $mail) use ($payload) {
            return $mail->hasTo($payload['email'])
                && $mail->hasTo('avacacionales@gmail.com')
                && $mail->contact['message'] === $payload['message'];
        });
    }

    public function test_contact_form_requires_name_email_and_message(): void
    {
        Mail::fake();

        $response = $this->postJson(route('contact.store'), [
            'phone' => '3001234567',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['first_name', 'last_name', 'email', 'message']);

        Mail::assertNothingSent();
    }

    public function test_contact_form_rejects_invalid_email(): void
    {
        Mail::fake();

        $response = $this->postJson(route('contact.store'), [
            'first_name' => 'Juan',
            'last_name' => 'Pérez',
            'email' => 'not-an-email',
            'message' => 'Hola',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);

        Mail::assertNothingSent();
    }
}
