Nuevo mensaje de contacto - {{ config('app.name') }}

Se ha recibido un nuevo mensaje a través del formulario de contacto del sitio web.

DATOS DE CONTACTO
==================

Nombre: {{ $contact['first_name'] }} {{ $contact['last_name'] }}
Correo electrónico: {{ $contact['email'] }}
@if(!empty($contact['phone']))
Teléfono: {{ $contact['phone'] }}
@endif

MENSAJE
==================

{{ $contact['message'] }}

---
Puedes responder directamente a este correo para contactar a {{ $contact['first_name'] }}.

© {{ date('Y') }} {{ config('app.name') }}. Todos los derechos reservados.
