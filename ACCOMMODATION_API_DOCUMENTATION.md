# API de Gestión de Alojamientos y Reservas

## Descripción General

Este módulo proporciona una API RESTful completa para la gestión de alojamientos y reservas, similar a Booking.com. El sistema incluye funcionalidades para buscar alojamientos, ver detalles, y realizar reservas con validación de disponibilidad.

## Características Principales

- ✅ Búsqueda y filtrado avanzado de alojamientos
- ✅ Sistema de reservas con validación de disponibilidad
- ✅ Gestión de habitaciones y precios
- ✅ Sistema de amenidades (servicios)
- ✅ Gestión de fotos polimórficas
- ✅ Sistema de reseñas
- ✅ API RESTful con autenticación Sanctum

## Estructura de Base de Datos

### Tablas Principales

1. **accommodations** - Alojamientos
2. **rooms** - Habitaciones 
3. **bookings** - Reservas
4. **amenities** - Servicios/Amenidades
5. **reviews** - Reseñas
6. **photos** - Fotos (polimórfica)
7. **amenity_accommodation** - Tabla pivote

## Endpoints de la API

### Base URL: `/api/v1`

### 1. Listar Alojamientos (Público)

**GET** `/api/v1/accommodations`

Busca y filtra alojamientos con múltiples criterios.

#### Parámetros de Query:

```
city          - Filtrar por ciudad (ej: "Cartagena")
country       - Filtrar por país (ej: "Colombia") 
type          - Filtrar por tipo: hotel|apartamento|casa|hostal|villa
star_rating   - Rating mínimo (1-5)
min_price     - Precio mínimo por noche
max_price     - Precio máximo por noche
guests_adults - Número de adultos
guests_children - Número de niños
amenities     - IDs de amenidades separados por coma (ej: "1,2,3")
sort_by       - Campo para ordenar: created_at|price
sort_order    - Orden: asc|desc
per_page      - Elementos por página (default: 15)
```

#### Ejemplo de Request:
```bash
GET /api/v1/accommodations?city=Cartagena&type=hotel&star_rating=4&min_price=200000&max_price=500000&amenities=1,2,3&sort_by=price&sort_order=asc&per_page=10
```

#### Ejemplo de Response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Hotel Boutique Cartagena",
      "description": "Elegante hotel boutique...",
      "type": "hotel",
      "city": "Cartagena",
      "country": "Colombia",
      "star_rating": 5,
      "status": "publicado",
      "average_rating": 4.5,
      "min_price": "250000.00",
      "rooms": [...],
      "amenities": [...],
      "photos": [...],
      "reviews": [...]
    }
  ],
  "current_page": 1,
  "per_page": 10,
  "total": 25,
  "last_page": 3
}
```

### 2. Ver Detalles de Alojamiento (Público)

**GET** `/api/v1/accommodations/{id}`

#### Response:
```json
{
  "data": {
    "id": 1,
    "name": "Hotel Boutique Cartagena",
    "description": "Elegante hotel boutique en el corazón...",
    "type": "hotel",
    "address_line_1": "Calle de la Factoria #36-57",
    "city": "Cartagena",
    "state": "Bolívar",
    "country": "Colombia",
    "latitude": "10.42360000",
    "longitude": "-75.53780000",
    "star_rating": 5,
    "contact_email": "reservas@hotel.com",
    "contact_phone": "+57 5 123-4567",
    "average_rating": 4.5,
    "min_price": "250000.00",
    "rooms": [
      {
        "id": 1,
        "name": "Habitación Superior con Vista al Mar",
        "description": "Amplia habitación con balcón...",
        "capacity_adults": 2,
        "capacity_children": 1,
        "price_per_night": "350000.00",
        "is_available": true,
        "photos": [...]
      }
    ],
    "amenities": [
      {
        "id": 1,
        "name": "WiFi Gratis",
        "slug": "wifi-gratis"
      }
    ],
    "photos": [...],
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Excelente servicio y ubicación perfecta",
        "user": {
          "name": "Juan Pérez"
        },
        "created_at": "2025-01-15T10:30:00Z"
      }
    ]
  }
}
```

### 3. Crear Reserva (Requiere Autenticación)

**POST** `/api/v1/bookings`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Request Body:
```json
{
  "room_id": 1,
  "check_in_date": "2025-02-15",
  "check_out_date": "2025-02-18",
  "guests_adults": 2,
  "guests_children": 1
}
```

#### Validaciones Automáticas:
- ✅ Verificación de capacidad de la habitación
- ✅ Validación de disponibilidad en las fechas
- ✅ Cálculo automático del precio total
- ✅ Prevención de condiciones de carrera

#### Response Exitoso (201):
```json
{
  "message": "Reserva creada exitosamente.",
  "data": {
    "id": 1,
    "user_id": 1,
    "room_id": 1,
    "check_in_date": "2025-02-15",
    "check_out_date": "2025-02-18",
    "guests_adults": 2,
    "guests_children": 1,
    "total_price": "1050000.00",
    "status": "confirmada",
    "room": {
      "name": "Habitación Superior con Vista al Mar",
      "accommodation": {
        "name": "Hotel Boutique Cartagena"
      }
    }
  }
}
```

#### Response Error - Sin Disponibilidad (409):
```json
{
  "message": "La habitación no está disponible para las fechas seleccionadas.",
  "errors": {
    "availability": ["Habitación no disponible"]
  }
}
```

#### Response Error - Capacidad Excedida (422):
```json
{
  "message": "La habitación no tiene capacidad suficiente para la cantidad de huéspedes solicitada.",
  "errors": {
    "capacity": ["Capacidad excedida"]
  }
}
```

### 4. Listar Mis Reservas (Requiere Autenticación)

**GET** `/api/v1/bookings`

**Headers:**
```
Authorization: Bearer {token}
```

#### Response:
```json
{
  "data": [
    {
      "id": 1,
      "check_in_date": "2025-02-15",
      "check_out_date": "2025-02-18",
      "guests_adults": 2,
      "guests_children": 1,
      "total_price": "1050000.00",
      "status": "confirmada",
      "room": {
        "name": "Habitación Superior con Vista al Mar",
        "accommodation": {
          "name": "Hotel Boutique Cartagena",
          "city": "Cartagena"
        }
      }
    }
  ],
  "current_page": 1,
  "per_page": 15,
  "total": 5
}
```

### 5. Ver Detalles de Reserva (Requiere Autenticación)

**GET** `/api/v1/bookings/{id}`

### 6. Cancelar Reserva (Requiere Autenticación)

**DELETE** `/api/v1/bookings/{id}`

## Lógica de Negocio Implementada

### 1. Verificación de Disponibilidad

El sistema implementa una lógica robusta para verificar disponibilidad:

```php
public function isAvailableBetween($checkIn, $checkOut)
{
    if (!$this->is_available) {
        return false;
    }

    // Verificar solapamiento de fechas con reservas existentes
    $conflictingBookings = $this->bookings()
        ->where('status', '!=', 'cancelada')
        ->where(function ($query) use ($checkIn, $checkOut) {
            $query->whereBetween('check_in_date', [$checkIn, $checkOut])
                  ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                  ->orWhere(function ($subQuery) use ($checkIn, $checkOut) {
                      $subQuery->where('check_in_date', '<=', $checkIn)
                               ->where('check_out_date', '>=', $checkOut);
                  });
        })
        ->exists();

    return !$conflictingBookings;
}
```

### 2. Prevención de Condiciones de Carrera

Las reservas se procesan dentro de transacciones de base de datos:

```php
DB::beginTransaction();
try {
    // Crear reserva
    $booking = Booking::create($data);
    
    // Verificar conflictos después de la creación
    if ($hasConflicts) {
        DB::rollBack();
        return error_response();
    }
    
    DB::commit();
    return success_response($booking);
} catch (\Exception $e) {
    DB::rollBack();
    return error_response();
}
```

### 3. Cálculo Automático de Precios

```php
$nights = $checkIn->diffInDays($checkOut);
$totalPrice = $room->price_per_night * $nights;
```

## Modelos y Relaciones

### Accommodation
- `belongsTo(User::class)` - Propietario
- `hasMany(Room::class)` - Habitaciones
- `hasMany(Review::class)` - Reseñas
- `belongsToMany(Amenity::class)` - Servicios
- `morphMany(Photo::class)` - Fotos

### Room
- `belongsTo(Accommodation::class)` - Alojamiento
- `hasMany(Booking::class)` - Reservas
- `morphMany(Photo::class)` - Fotos

### Booking
- `belongsTo(User::class)` - Usuario
- `belongsTo(Room::class)` - Habitación
- `hasMany(Review::class)` - Reseñas

## Configuración e Instalación

### 1. Ejecutar Migraciones
```bash
php artisan migrate
```

### 2. Ejecutar Seeders (Opcional)
```bash
php artisan db:seed --class=AccommodationSeeder
```

### 3. Configurar Storage para Fotos
```bash
php artisan storage:link
```

## Ejemplos de Uso Completos

### Buscar Hoteles en Cartagena con Piscina
```bash
curl -X GET "http://tu-app.com/api/v1/accommodations?city=Cartagena&type=hotel&amenities=2" \
  -H "Accept: application/json"
```

### Hacer una Reserva
```bash
curl -X POST "http://tu-app.com/api/v1/bookings" \
  -H "Authorization: Bearer tu-token" \
  -H "Content-Type: application/json" \
  -d '{
    "room_id": 1,
    "check_in_date": "2025-02-15",
    "check_out_date": "2025-02-18",
    "guests_adults": 2,
    "guests_children": 0
  }'
```

## Notas Adicionales

- Todos los precios están en pesos colombianos (COP)
- Las fechas deben estar en formato ISO 8601 (YYYY-MM-DD)
- Los tokens de autenticación se obtienen mediante el sistema de login existente
- El sistema está optimizado con índices de base de datos para búsquedas rápidas
- Se incluyen validaciones client-side y server-side completas

## Próximas Funcionalidades

- Sistema de calificaciones y reseñas detalladas
- Gestión de fotos con upload
- Panel de administración para propietarios
- Integración con pasarelas de pago
- Sistema de notificaciones
- API de disponibilidad en tiempo real
