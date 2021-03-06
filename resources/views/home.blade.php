<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="manifest" href="{{ asset('storage/manifest.json') }}">
  <link rel="icon" sizes="192x192" href="{{ asset('storage/images/budget-192.png') }}">
  <link rel="apple-touch-icon" href="{{ asset('storage/images/budget-192.png') }}">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="user" content="{{ Auth::user() }}">

  <title>{{ config('app.name', 'Budget') }}</title>

  <!-- Scripts -->
  <script src="{{ mix('js/app.js') }}" defer></script>

  <!-- Styles -->
  <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>


<body>
    <div id="app" v-cloak>
        <router-view></router-view>
    </div>
</body>


</html>
