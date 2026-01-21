<?php

namespace Tests\Feature;

use App\Models\BookingProveedor;
use App\Models\BookingService;
use App\Models\PagoSaldos;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VendedorReportTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test que verifica que se puede acceder a la página del informe de vendedores
     */
    public function test_puede_acceder_a_pagina_de_informe_vendedores(): void
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        $this->actingAs($admin);

        $response = $this->get(route('vendedor.report.index'));

        $response->assertStatus(200);
    }

    /**
     * Test que verifica que se obtiene el informe de un vendedor correctamente
     */
    public function test_obtiene_informe_de_vendedor_correctamente(): void
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        $vendedor = User::factory()->create(['rol' => 'vendedor']);
        $this->actingAs($admin);

        // Crear booking services para el vendedor
        $booking1 = BookingService::create([
            'service' => 'TRANSFER',
            'service_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f2',
            'adults' => 2,
            'adults_price' => 100000,
            'adult_tarifa' => 80000,
            'boys' => 1,
            'boys_tarifa' => 40000,
            'boys_price' => 50000,
            'date' => now()->addDays(5)->format('Y-m-d'),
            'hour' => '10:00:00',
            'cliente_name' => 'Test Cliente 1',
            'cliente_phone' => '3001234567',
            'cliente_city' => 'Cartagena',
            'cliente_building' => 'Hotel Test',
            'user_id' => $vendedor->id,
        ]);

        $booking2 = BookingService::create([
            'service' => 'TOUR',
            'service_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f3',
            'adults' => 3,
            'adults_price' => 150000,
            'adult_tarifa' => 120000,
            'boys' => 2,
            'boys_tarifa' => 60000,
            'boys_price' => 75000,
            'date' => now()->addDays(10)->format('Y-m-d'),
            'hour' => '14:00:00',
            'cliente_name' => 'Test Cliente 2',
            'cliente_phone' => '3009876543',
            'cliente_city' => 'Barranquilla',
            'cliente_building' => 'Hotel Test 2',
            'user_id' => $vendedor->id,
        ]);

        // Crear proveedores
        $proveedor1 = BookingProveedor::create([
            'booking_service_id' => $booking1->id,
            'proveedor_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f4',
            'cost' => 100000,
            'payment' => 0,
        ]);

        $proveedor2 = BookingProveedor::create([
            'booking_service_id' => $booking2->id,
            'proveedor_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f5',
            'cost' => 200000,
            'payment' => 0,
        ]);

        // Crear pagos de saldos
        PagoSaldos::create([
            'amount' => 20000,
            'proveedor_id' => $proveedor1->id,
            'booking_service_id' => $booking1->id,
        ]);

        PagoSaldos::create([
            'amount' => 50000,
            'proveedor_id' => $proveedor2->id,
            'booking_service_id' => $booking2->id,
        ]);

        $response = $this->getJson(route('api.vendedor.report.show', $vendedor->id));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'vendedor' => ['id', 'name', 'email'],
                'totales' => [
                    'total_vendido',
                    'total_recaudo',
                    'total_pagado',
                    'saldo_pendiente',
                ],
                'detalles',
            ]);

        // Verificar cálculos
        $data = $response->json();

        // Total vendido = (2*100000 + 1*50000) + (3*150000 + 2*75000) = 250000 + 600000 = 850000
        $this->assertEquals(850000, $data['totales']['total_vendido']);

        // Recaudo booking1 = 2*(100000-80000) + 1*(50000-40000) = 40000 + 10000 = 50000
        // Recaudo booking2 = 3*(150000-120000) + 2*(75000-60000) = 90000 + 30000 = 120000
        // Total recaudo = 50000 + 120000 = 170000
        $this->assertEquals(170000, $data['totales']['total_recaudo']);

        // Total pagado = 20000 + 50000 = 70000
        $this->assertEquals(70000, $data['totales']['total_pagado']);

        // Saldo pendiente = 170000 - 70000 = 100000
        $this->assertEquals(100000, $data['totales']['saldo_pendiente']);
    }

    /**
     * Test que verifica que el informe filtra por fechas correctamente
     */
    public function test_informe_filtra_por_fechas_correctamente(): void
    {
        $admin = User::factory()->create(['rol' => 'admin']);
        $vendedor = User::factory()->create(['rol' => 'vendedor']);
        $this->actingAs($admin);

        // Crear booking en diferentes fechas
        $bookingPasado = BookingService::create([
            'service' => 'TRANSFER',
            'service_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f2',
            'adults' => 2,
            'adults_price' => 100000,
            'adult_tarifa' => 80000,
            'boys' => 0,
            'boys_tarifa' => 0,
            'boys_price' => 0,
            'date' => now()->subDays(10)->format('Y-m-d'),
            'hour' => '10:00:00',
            'cliente_name' => 'Test Cliente Pasado',
            'cliente_phone' => '3001234567',
            'cliente_city' => 'Cartagena',
            'cliente_building' => 'Hotel Test',
            'user_id' => $vendedor->id,
        ]);

        $bookingFuturo = BookingService::create([
            'service' => 'TOUR',
            'service_id' => '9e6ff892-2934-4fdd-9f57-6eb4fbaec0f3',
            'adults' => 3,
            'adults_price' => 150000,
            'adult_tarifa' => 120000,
            'boys' => 0,
            'boys_tarifa' => 0,
            'boys_price' => 0,
            'date' => now()->addDays(5)->format('Y-m-d'),
            'hour' => '14:00:00',
            'cliente_name' => 'Test Cliente Futuro',
            'cliente_phone' => '3009876543',
            'cliente_city' => 'Barranquilla',
            'cliente_building' => 'Hotel Test 2',
            'user_id' => $vendedor->id,
        ]);

        // Filtrar solo bookings futuros
        $response = $this->getJson(route('vendedor.report.show', [
            'vendedor' => $vendedor->id,
            'fecha_inicio' => now()->format('Y-m-d'),
        ]));

        $response->assertStatus(200);
        $data = $response->json();

        // Solo debe incluir el booking futuro
        $this->assertCount(1, $data['detalles']);
        $this->assertEquals('Test Cliente Futuro', $data['detalles'][0]['cliente']);
    }

    /**
     * Test que verifica que no se puede acceder sin autenticación
     */
    public function test_no_puede_acceder_sin_autenticacion(): void
    {
        $vendedor = User::factory()->create(['rol' => 'vendedor']);

        $response = $this->getJson(route('vendedor.report.show', $vendedor->id));

        $response->assertStatus(401);
    }
}
