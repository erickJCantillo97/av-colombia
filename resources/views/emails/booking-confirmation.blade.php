<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Reserva</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
        }
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        .header p {
            font-size: 16px;
            opacity: 0.95;
            font-weight: 300;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 12px;
        }
        .intro-text {
            color: #4a5568;
            margin-bottom: 32px;
            font-size: 15px;
        }
        .card {
            background: #f7fafc;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid #e2e8f0;
        }
        .card-title {
            font-size: 14px;
            font-weight: 600;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
        }
        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 0;
            width: 100%;
            border-bottom: 1px solid #e2e8f0;
        }
        .detail-item:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-size: 14px;
            color: #718096;
            font-weight: 500;
        }
        .detail-value {
            font-size: 15px;
            color: #2d3748;
            font-weight: 600;
            text-align: right;
        }
        .status-badge {
            display: inline-block;
            padding: 6px 14px;
            border-radius: 24px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-sin-confirmar {
            background: #fef3c7;
            color: #92400e;
        }
        .status-confirmada {
            background: #d1fae5;
            color: #065f46;
        }
        .price-banner {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 24px;
            border-radius: 12px;
            margin: 32px 0;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .price-label {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 8px;
            font-weight: 500;
        }
        .price-amount {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -1px;
        }
        .info-box {
            background: #eff6ff;
            border-left: 4px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
        }
        .info-box-title {
            font-size: 16px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 12px;
        }
        .info-box p {
            color: #1e40af;
            font-size: 14px;
            margin-bottom: 12px;
        }
        .contact-list {
            list-style: none;
            margin: 12px 0 0 0;
        }
        .contact-list li {
            color: #1e40af;
            font-size: 14px;
            margin: 8px 0;
            padding-left: 0;
        }
        .alert-box {
            background: #fef9f3;
            border: 1px solid #fde68a;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
        }
        .alert-box strong {
            color: #92400e;
            font-weight: 700;
        }
        .alert-box p {
            color: #78350f;
            font-size: 14px;
            margin: 4px 0 0 0;
        }
        .footer {
            background: #f7fafc;
            padding: 32px 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            color: #718096;
            font-size: 13px;
            margin: 6px 0;
        }
        .payment-box {
            background: #f0fdf4;
            border: 2px solid #10b981;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
        }
        .payment-box-title {
            font-size: 18px;
            font-weight: 700;
            color: #065f46;
            margin-bottom: 16px;
            text-align: center;
        }
        .payment-address {
            background: white;
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;
            border-left: 4px solid #10b981;
        }
        .payment-address-title {
            font-size: 14px;
            font-weight: 600;
            color: #059669;
            margin-bottom: 8px;
        }
        .payment-address p {
            color: #047857;
            font-size: 14px;
            margin: 4px 0;
            line-height: 1.5;
        }
        .qr-container {
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            background: white;
            border-radius: 8px;
        }
        .qr-container p {
            color: #065f46;
            font-size: 12px;
            margin-top: 12px;
            font-weight: 600;
        }
        .qr-container img {
            max-width: 200px;
            margin: 0 auto;
            display: block;
        }
        @media only screen and (max-width: 600px) {
            body {
                padding: 20px 10px;
            }
            .header {
                padding: 30px 20px;
            }
            .header h1 {
                font-size: 24px;
            }
            .content {
                padding: 30px 20px;
            }
            .price-amount {
                font-size: 28px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <!-- Header -->
        <div class="header">
            <h1>✨ Reserva Confirmada</h1>
            <p>¡Gracias por confiar en nosotros!</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">Hola {{ $customerData['cliente_name'] }},</div>
            <p class="intro-text">Tu reserva ha sido procesada exitosamente. A continuación encontrarás todos los detalles:</p>

            <!-- Booking Details Card -->
            <div class="card">
                <div class="card-title">Detalles de la Reserva</div>
                
                <div class="detail-item">
                    <span class="detail-label">Servicio</span>
                    <span class="detail-value">{{ $booking->service }}</span>
                </div>

                <div class="detail-item">
                    <span class="detail-label">Fecha</span>
                    <span class="detail-value">{{ \Carbon\Carbon::parse($booking->date)->format('d/m/Y') }}</span>
                </div>

                @if($booking->hour)
                <div class="detail-item">
                    <span class="detail-label">Hora</span>
                    <span class="detail-value">{{ $booking->hour }}</span>
                </div>
                @endif

                <div class="detail-item">
                    <span class="detail-label">Adultos</span>
                    <span class="detail-value">{{ $booking->adults }}</span>
                </div>

                @if($booking->boys > 0)
                <div class="detail-item">
                    <span class="detail-label">Niños</span>
                    <span class="detail-value">{{ $booking->boys }}</span>
                </div>
                @endif

                <div class="detail-item">
                    <span class="detail-label">Estado</span>
                    <span class="detail-value">
                        <span class="status-badge status-{{ strtolower(str_replace(' ', '-', $booking->status)) }}">
                            {{ $booking->status }}
                        </span>
                    </span>
                </div>

                @if($booking->observations)
                <div class="detail-item">
                    <span class="detail-label">Observaciones</span>
                    <span class="detail-value">{{ $booking->observations }}</span>
                </div>
                @endif
            </div>

            <!-- Price Banner -->
            <div class="price-banner">
                <div class="price-label">Total a Pagar</div>
                <div class="price-amount">${{ number_format($booking->total_price, 0, ',', '.') }}</div>
                <div class="price-label">COP</div>
            </div>

            <!-- Payment Location (Only for Cash) -->
            @if(isset($customerData['payment_method']) && $customerData['payment_method'] == 1)
            <div class="payment-box">
                <div class="payment-box-title">💵 Información de Pago en Efectivo</div>
                <div class="payment-address">
                    <div class="payment-address-title">📍 Dónde Pagar</div>
                    <p><strong>Dirección:</strong>Barrio crespo carrera 1 No. 62 -105 (en toda la avenida Santander, justo en frente del cai de policía de crespo)</p>
                    <p><strong>Ciudad:</strong> Cartagena de Indias, Colombia</p>
                    <p style="margin-top: 12px;"><strong>Horario de atención:</strong> Lunes a Viernes de 8:00 AM a 6:00 PM</p>
                </div>
                
                <!-- QR Code for Verification -->
                <div class="qr-container">
                    <p style="margin-bottom: 12px; font-size: 14px;">Código QR de verificación</p>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={{ urlencode(route('BookingServices.edit', $booking->id)) }}" alt="QR de verificación">
                    <p>Este código será escaneado por nuestro personal para verificar tu reserva</p>
                </div>
            </div>
            @endif

            <!-- Info Box -->
            <div class="info-box">
                <div class="info-box-title">💬 ¿Necesitas ayuda?</div>
                <p>Si tienes alguna pregunta o necesitas realizar cambios, contáctanos:</p>
                <ul class="contact-list">
                    <li>📧 {{ config('mail.from.address') }}</li>
                    <li>📱 [Número de contacto]</li>
                    <li>🕒 Lunes a Viernes: 8:00 AM - 6:00 PM</li>
                </ul>
            </div>

            <!-- Alert Box -->
            <div class="alert-box">
                <strong>Importante:</strong>
                <p>
                    @if($booking->status == 'SIN CONFIRMAR')
                        Tu reserva está pendiente de confirmación. Nos pondremos en contacto contigo pronto para confirmar todos los detalles.
                    @else
                        Te recomendamos llegar 15 minutos antes de la hora programada.
                    @endif
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            <p>© {{ date('Y') }} {{ config('app.name') }}. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
