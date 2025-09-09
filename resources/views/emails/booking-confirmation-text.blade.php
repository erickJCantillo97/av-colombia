Confirmación de Reserva - {{ $booking->service }}

Hola {{ $customerData['cliente_name'] }},

Tu reserva ha sido procesada exitosamente. A continuación, encontrarás los detalles de tu reserva:

DETALLES DE LA RESERVA
========================

Servicio: {{ $booking->service }}
Fecha: {{ \Carbon\Carbon::parse($booking->date)->format('d/m/Y') }}
@if($booking->hour)
Hora: {{ $booking->hour }}
@endif
Adultos: {{ $booking->adults }}
@if($booking->boys > 0)
Niños: {{ $booking->boys }}
@endif
Estado: {{ $booking->status }}
@if($booking->observations)
Observaciones: {{ $booking->observations }}
@endif

Total: ${{ number_format($booking->total_price, 0, ',', '.') }} COP


¿NECESITAS AYUDA?
================

Si tienes alguna pregunta sobre tu reserva o necesitas realizar algún cambio, no dudes en contactarnos:

- Email: {{ config('mail.from.address') }}
- Teléfono: [Número de contacto]
- Horario de atención: Lunes a Viernes de 8:00 AM a 6:00 PM

IMPORTANTE: 
@if($booking->status == 'SIN CONFIRMAR')
Tu reserva está pendiente de confirmación. Nos pondremos en contacto contigo pronto para confirmar todos los detalles.
@else
Te recomendamos llegar 15 minutos antes de la hora programada.
@endif

Este es un correo automático, por favor no respondas a este mensaje.

© {{ date('Y') }} {{ config('app.name') }}. Todos los derechos reservados.
