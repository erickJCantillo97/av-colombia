<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="En av colombia tenemos todos los servicios disponibles para que desfrutes de tu estadia en colombia, tenemos transporte, alojamientos, tours y todo tipo de embarcaciones para que puedas tener las mejores vacaciones que puedas desear en cartagena.">
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <Link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon" />
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://cdn.syncfusion.com/ej2/28.1.33/tailwind3.css" rel="stylesheet" />
    <!-- Scripts -->
    @routes
    @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
    @inertiaHead

</head>

<body class="font-sans antialiased overflow-auto overflow-x-hidden">
    @inertia
    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
</body>

</html>
