<?php

namespace Tests\Feature;

use App\Models\BookingProveedor;
use App\Models\BookingService;
use App\Models\PagoSaldos;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PagoSaldosTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test que verifica que se registran los pagos de saldos al completar una reserva
     */
    public function test_se_registran_pagos_de_saldos_al_completar_reserva(): void
    {
        // Crear usuario autenticado
        $user = User::factory()->create();
        $this->actingAs($user);

        // Crear una reserva y proveedor directamente para evitar dependencias
        $booking = BookingService::create([
            'service' => 'TRANSFER',
            'service_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f2', // ID fijo para pruebas
            'adults' => 2,
            'adults_price' => 100000,
            'adult_tarifa' => 120000,
            'boys' => 0,
            'boys_tarifa' => 0,
            'boys_price' => 0,
            'date' => now()->addDays(5)->format('Y-m-d'),
            'hour' => '10:00:00',
            'cliente_name' => 'Test Cliente',
            'cliente_phone' => '3001234567',
            'cliente_city' => 'Cartagena',
            'cliente_building' => 'Hotel Test',
            'user_id' => $user->id,
        ]);

        $proveedor = BookingProveedor::create([
            'booking_service_id' => $booking->id,
            'proveedor_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f3', // ID fijo para pruebas
            'cost' => 500000,
            'payment' => 0,
        ]);

        // Preparar datos de pago
        $montoPago = 200000;
        $requestData = [
            'service_id' => $booking->id,
            'status' => 'COMPLETADA',
            'saldos' => [
                [
                    'id' => $proveedor->id,
                    'amount' => $montoPago,
                ],
            ],
        ];

        // Ejecutar la acción de completar reserva
        $response = $this->post(route('completar.reserva'), $requestData);

        // Verificar que se creó el registro en pago_saldos
        $this->assertDatabaseHas('pago_saldos', [
            'amount' => $montoPago,
            'proveedor_id' => $proveedor->id,
            'booking_service_id' => $booking->id,
        ]);

        // Verificar que el costo del proveedor se actualizó correctamente
        $proveedor->refresh();
        $this->assertEquals(300000, $proveedor->cost);

        // Verificar que existe la relación
        $pagoSaldo = PagoSaldos::where('booking_service_id', $booking->id)->first();
        $this->assertNotNull($pagoSaldo);
        $this->assertEquals($booking->id, $pagoSaldo->bookingService->id);
        $this->assertEquals($proveedor->id, $pagoSaldo->proveedor->id);
    }

    /**
     * Test que verifica múltiples pagos a diferentes proveedores
     */
    public function test_se_registran_multiples_pagos_de_saldos(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $booking = BookingService::create([
            'service' => 'TOUR',
            'service_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f2',
            'adults' => 2,
            'adults_price' => 100000,
            'adult_tarifa' => 120000,
            'boys' => 0,
            'boys_tarifa' => 0,
            'boys_price' => 0,
            'date' => now()->addDays(5)->format('Y-m-d'),
            'hour' => '10:00:00',
            'cliente_name' => 'Test Cliente',
            'cliente_phone' => '3001234567',
            'cliente_city' => 'Cartagena',
            'cliente_building' => 'Hotel Test',
            'user_id' => $user->id,
        ]);

        $proveedor1 = BookingProveedor::create([
            'booking_service_id' => $booking->id,
            'proveedor_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f3',
            'cost' => 300000,
            'payment' => 0,
        ]);
        $proveedor2 = BookingProveedor::create([
            'booking_service_id' => $booking->id,
            'proveedor_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f4',
            'cost' => 400000,
            'payment' => 0,
        ]);

        $requestData = [
            'service_id' => $booking->id,
            'status' => 'COMPLETADA',
            'saldos' => [
                [
                    'id' => $proveedor1->id,
                    'amount' => 150000,
                ],
                [
                    'id' => $proveedor2->id,
                    'amount' => 250000,
                ],
            ],
        ];

        $this->post(route('completar.reserva'), $requestData);

        // Verificar que se crearon ambos registros
        $this->assertDatabaseHas('pago_saldos', [
            'amount' => 150000,
            'proveedor_id' => $proveedor1->id,
        ]);

        $this->assertDatabaseHas('pago_saldos', [
            'amount' => 250000,
            'proveedor_id' => $proveedor2->id,
        ]);

        // Verificar que los costos se actualizaron
        $proveedor1->refresh();
        $proveedor2->refresh();
        $this->assertEquals(150000, $proveedor1->cost);
        $this->assertEquals(150000, $proveedor2->cost);

        // Verificar que la reserva tiene 2 pagos de saldos
        $this->assertCount(2, $booking->pagosSaldos);
    }

    /**
     * Test que verifica las relaciones del modelo
     */
    public function test_relaciones_del_modelo_pago_saldos(): void
    {
        $user = User::factory()->create();

        $booking = BookingService::create([
            'service' => 'ALOJAMIENTO',
            'service_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f2',
            'adults' => 2,
            'adults_price' => 100000,
            'adult_tarifa' => 120000,
            'boys' => 0,
            'boys_tarifa' => 0,
            'boys_price' => 0,
            'date' => now()->addDays(5)->format('Y-m-d'),
            'hour' => '10:00:00',
            'cliente_name' => 'Test Cliente',
            'cliente_phone' => '3001234567',
            'cliente_city' => 'Cartagena',
            'cliente_building' => 'Hotel Test',
            'user_id' => $user->id,
        ]);

        $proveedor = BookingProveedor::create([
            'booking_service_id' => $booking->id,
            'proveedor_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f3',
            'cost' => 200000,
            'payment' => 0,
        ]);

        $pagoSaldo = PagoSaldos::create([
            'amount' => 100000,
            'proveedor_id' => $proveedor->id,
            'booking_service_id' => $booking->id,
        ]);

        // Verificar relación con BookingService
        $this->assertInstanceOf(BookingService::class, $pagoSaldo->bookingService);
        $this->assertEquals($booking->id, $pagoSaldo->bookingService->id);

        // Verificar relación con BookingProveedor
        $this->assertInstanceOf(BookingProveedor::class, $pagoSaldo->proveedor);
        $this->assertEquals($proveedor->id, $pagoSaldo->proveedor->id);

        // Verificar relación inversa
        $this->assertTrue($booking->pagosSaldos->contains($pagoSaldo));
        $this->assertTrue($proveedor->pagosSaldos->contains($pagoSaldo));
    }
}
