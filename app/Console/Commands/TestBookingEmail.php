<?php

namespace App\Console\Commands;

use App\Mail\BookingConfirmation;
use App\Models\BookingService;
use App\Models\Payment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestBookingEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:booking-email {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envía un correo de prueba de confirmación de reserva';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        // Crear datos de prueba
        $mockBooking = new BookingService([
            'service' => 'Tour de Prueba',
            'date' => now(),
            'hour' => '10:00 AM',
            'adults' => 2,
            'boys' => 1,
            'status' => 'SIN CONFIRMAR',
            'total_price' => 150000,
            'observations' => 'Reserva de prueba para testing'
        ]);

        $mockPayment = new Payment([
            'amount' => 150000,
            'status' => 'Pendiente'
        ]);

        $customerData = [
            'cliente_name' => 'Juan Pérez',
            'cliente_email' => $email,
            'payment_method' => 'Tarjeta de Crédito',
            'last_name' => 'Pérez'
        ];

        try {
            Mail::to($email)->send(new BookingConfirmation($mockBooking, $mockPayment, $customerData));
            $this->info("✅ Correo de prueba enviado exitosamente a: {$email}");
        } catch (\Exception $e) {
            $this->error("❌ Error al enviar el correo: " . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
