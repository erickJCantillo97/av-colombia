<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo mensaje de contacto</title>
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
            background: linear-gradient(135deg, #f43f5e 0%, #db2777 100%);
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
            background: linear-gradient(135deg, #f43f5e 0%, #db2777 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        .header h1 {
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        .header p {
            font-size: 15px;
            opacity: 0.95;
            font-weight: 300;
        }
        .content {
            padding: 40px 30px;
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
        .detail-value a {
            color: #db2777;
            text-decoration: none;
        }
        .message-box {
            background: #fff1f2;
            border-left: 4px solid #f43f5e;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
        }
        .message-box-title {
            font-size: 14px;
            font-weight: 700;
            color: #9f1239;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .message-box p {
            color: #4a5568;
            font-size: 15px;
            white-space: pre-line;
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
        @media only screen and (max-width: 600px) {
            body {
                padding: 20px 10px;
            }
            .header {
                padding: 30px 20px;
            }
            .header h1 {
                font-size: 22px;
            }
            .content {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <!-- Header -->
        <div class="header">
            <h1>📩 Nuevo mensaje de contacto</h1>
            <p>Recibido desde el formulario de {{ config('app.name') }}</p>
        </div>

        <!-- Content -->
        <div class="content">
            <p class="intro-text">Se ha recibido un nuevo mensaje a través del formulario de contacto del sitio web. A continuación encontrarás los datos:</p>

            <!-- Contact Details Card -->
            <div class="card">
                <div class="card-title">Datos de contacto</div>

                <div class="detail-item">
                    <span class="detail-label">Nombre</span>
                    <span class="detail-value">{{ $contact['first_name'] }} {{ $contact['last_name'] }}</span>
                </div>

                <div class="detail-item">
                    <span class="detail-label">Correo electrónico</span>
                    <span class="detail-value"><a href="mailto:{{ $contact['email'] }}">{{ $contact['email'] }}</a></span>
                </div>

                @if(!empty($contact['phone']))
                <div class="detail-item">
                    <span class="detail-label">Teléfono</span>
                    <span class="detail-value"><a href="tel:{{ $contact['phone'] }}">{{ $contact['phone'] }}</a></span>
                </div>
                @endif
            </div>

            <!-- Message -->
            <div class="message-box">
                <div class="message-box-title">Mensaje</div>
                <p>{{ $contact['message'] }}</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Puedes responder directamente a este correo para contactar a {{ $contact['first_name'] }}.</p>
            <p>© {{ date('Y') }} {{ config('app.name') }}. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
