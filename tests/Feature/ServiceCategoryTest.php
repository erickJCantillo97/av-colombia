<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceCategoryTest extends TestCase
{
    use RefreshDatabase;

    private function authenticate(): User
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        return $user;
    }

    private function createService(array $attributes = []): Service
    {
        return Service::create(array_merge([
            'title' => 'Tour '.fake()->unique()->word(),
            'description' => 'Descripción de prueba',
            'adults_price' => 100,
            'boys_price' => 50,
        ], $attributes));
    }

    public function test_index_lista_las_categorias(): void
    {
        $this->authenticate();
        ServiceCategory::factory()->count(3)->create();

        $response = $this->getJson(route('serviceCategories.index'));

        $response->assertStatus(200)->assertJsonCount(3);
    }

    public function test_store_crea_una_categoria(): void
    {
        $this->authenticate();

        $response = $this->postJson(route('serviceCategories.store'), [
            'title' => 'Playas',
            'color' => '#0ea5e9',
            'icon' => 'fa-solid fa-umbrella-beach',
        ]);

        $response->assertStatus(201)->assertJsonFragment(['title' => 'Playas']);
        $this->assertDatabaseHas('service_categories', [
            'title' => 'Playas',
            'color' => '#0ea5e9',
            'icon' => 'fa-solid fa-umbrella-beach',
        ]);
    }

    public function test_store_requiere_titulo(): void
    {
        $this->authenticate();

        $response = $this->postJson(route('serviceCategories.store'), [
            'color' => '#0ea5e9',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('title');
    }

    public function test_store_no_permite_titulo_duplicado(): void
    {
        $this->authenticate();
        ServiceCategory::factory()->create(['title' => 'Islas']);

        $response = $this->postJson(route('serviceCategories.store'), [
            'title' => 'Islas',
        ]);

        $response->assertStatus(422)->assertJsonValidationErrors('title');
    }

    public function test_update_modifica_la_categoria(): void
    {
        $this->authenticate();
        $category = ServiceCategory::factory()->create(['title' => 'Aventura', 'color' => '#000000']);

        $response = $this->putJson(route('serviceCategories.update', $category->id), [
            'title' => 'Aventura Extrema',
            'color' => '#f97316',
            'icon' => 'fa-solid fa-mountain-sun',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('service_categories', [
            'id' => $category->id,
            'title' => 'Aventura Extrema',
            'color' => '#f97316',
        ]);
    }

    public function test_update_permite_conservar_el_mismo_titulo(): void
    {
        $this->authenticate();
        $category = ServiceCategory::factory()->create(['title' => 'Ciudad']);

        $response = $this->putJson(route('serviceCategories.update', $category->id), [
            'title' => 'Ciudad',
            'color' => '#6366f1',
        ]);

        $response->assertStatus(200);
    }

    public function test_destroy_elimina_la_categoria(): void
    {
        $this->authenticate();
        $category = ServiceCategory::factory()->create();

        $response = $this->deleteJson(route('serviceCategories.destroy', $category->id));

        $response->assertStatus(200);
        $this->assertDatabaseMissing('service_categories', ['id' => $category->id]);
    }

    public function test_un_servicio_se_asocia_a_una_categoria(): void
    {
        $this->authenticate();
        $category = ServiceCategory::factory()->create();
        $service = $this->createService(['service_category_id' => $category->id]);

        $this->assertEquals($category->id, $service->fresh()->serviceCategory->id);
    }

    public function test_eliminar_categoria_desasocia_los_servicios(): void
    {
        $this->authenticate();
        $category = ServiceCategory::factory()->create();
        $service = $this->createService(['service_category_id' => $category->id]);

        $this->deleteJson(route('serviceCategories.destroy', $category->id))->assertStatus(200);

        $this->assertNull($service->fresh()->service_category_id);
    }

    public function test_requiere_autenticacion(): void
    {
        $response = $this->getJson(route('serviceCategories.index'));

        $response->assertStatus(401);
    }
}
