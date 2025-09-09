<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Reserva</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #007bff;
        }
        .header h1 {
            color: #007bff;
            margin: 0;
        }
        .booking-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .detail-label {
            font-weight: bold;
            color: #666;
        }
        .detail-value {
            color: #333;
        }
        .price-total {
            font-size: 1.2em;
            font-weight: bold;
            color: #007bff;
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            background: #e7f3ff;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9em;
        }
        .status {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-sin-confirmar {
            background: #fff3cd;
            color: #856404;
        }
        .status-confirmada {
            background: #d4edda;
            color: #155724;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Confirmación de Reserva</h1>
            <p>¡Gracias por confiar en nosotros!</p>
        </div>

        <div class="content">
            <h2>Hola {{ $customerData['cliente_name'] }},</h2>
            <p>Tu reserva ha sido procesada exitosamente. A continuación, encontrarás los detalles de tu reserva:</p>

            <div class="booking-details">
                <h3>📋 Detalles de la Reserva</h3>
                
                <div class="detail-row">
                    <span class="detail-label">Servicio:</span>
                    <span class="detail-value">{{ $booking->service }}</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Fecha:</span>
                    <span class="detail-value">{{ \Carbon\Carbon::parse($booking->date)->format('d/m/Y') }}</span>
                </div>

                @if($booking->hour)
                <div class="detail-row">
                    <span class="detail-label">Hora:</span>
                    <span class="detail-value">{{ $booking->hour }}</span>
                </div>
                @endif

                <div class="detail-row">
                    <span class="detail-label">Adultos:</span>
                    <span class="detail-value">{{ $booking->adults }}</span>
                </div>

                @if($booking->boys > 0)
                <div class="detail-row">
                    <span class="detail-label">Niños:</span>
                    <span class="detail-value">{{ $booking->boys }}</span>
                </div>
                @endif

                <div class="detail-row">
                    <span class="detail-label">Estado:</span>
                    <span class="detail-value">
                        <span class="status status-{{ strtolower(str_replace(' ', '-', $booking->status)) }}">
                            {{ $booking->status }}
                        </span>
                    </span>
                </div>

                @if($booking->observations)
                <div class="detail-row">
                    <span class="detail-label">Observaciones:</span>
                    <span class="detail-value">{{ $booking->observations }}</span>
                </div>
                @endif
            </div>

            <div class="price-total">
                💰 Total: ${{ number_format($booking->total_price, 0, ',', '.') }} COP
            </div>

            <div style="margin: 30px 0; padding: 20px; background: #e8f4fd; border-radius: 8px; border-left: 4px solid #007bff;">
                <h3 style="color: #007bff; margin-top: 0;">📞 ¿Necesitas ayuda?</h3>
                <p>Si tienes alguna pregunta sobre tu reserva o necesitas realizar algún cambio, no dudes en contactarnos:</p>
                <ul style="margin: 10px 0;">
                    <li>📧 Email: {{ config('mail.from.address') }}</li>
                    <li>📱 Teléfono: [Número de contacto]</li>
                    <li>🕒 Horario de atención: Lunes a Viernes de 8:00 AM a 6:00 PM</li>
                </ul>
            </div>

            <p><strong>Importante:</strong> 
                @if($booking->status == 'SIN CONFIRMAR')
                    Tu reserva está pendiente de confirmación. Nos pondremos en contacto contigo pronto para confirmar todos los detalles.
                @else
                    Te recomendamos llegar 15 minutos antes de la hora programada.
                @endif
            </p>
        </div>

        <div class="footer">
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            <p>© {{ date('Y') }} {{ config('app.name') }}. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
