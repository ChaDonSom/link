<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="manifest" href="{{ asset('storage/budget-manifest.json') }}">
  <link rel="icon" sizes="192x192" href="{{ asset('storage/images/budget/budget-192.png') }}">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Budget</title>

  <!-- Scripts -->
  <script src="{{ asset('js/budget-app.js') }}" defer></script>

  <!-- Fonts -->
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Raleway:100" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet" type="text/css">

  <!-- Styles -->
  <link href="{{ asset('css/budget-app.css') }}" rel="stylesheet">
</head>


<body>

  <div id="main" class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      
      @if(!Auth::user())
        <div class="mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-2-tablet mdc-layout-grid__cell--span-2-phone">
          You must be signed in to use the Budget app. <br>
          <a href="/login">Log in</a>
        </div>
      @else
        <div class="mdc-layout-grid__cell--span-12 add-check-row">
          <button class="mdc-icon-button material-icons" @@click="addCheck"
              title="add new paycheck">add</button>
          <flat-pickr :config="cal.config" v-model="cal.value" @@on-change="saveNewCheck"
              ref="flatPickr"></flat-pickr>
          <div class="mdc-text-field mdc-text-field--with-leading-icon" ref="checkAmount">
            <i class="mdc-text-field__icon" tabindex="0">$</i>
            <input type="text" id="check-amount" class="mdc-text-field__input" v-model="checkAmount">
            <label class="mdc-floating-label" for="check-amount">Deposit Amount</label>
            <div class="mdc-line-ripple"></div>
          </div>
        </div>
        <list-check v-for="check of checks" :check="check" :key="'check-'+check.id"
            @@check-remove="deletedCheck" @@bill-remove="deletedBill"
            @@bill-update="updatedBill"></list-check>
        <!--<div class="mdc-layout-grid__cell--span-12 add-bill-line"><em>add bill:</em></div>-->
        <add-bill @bill-add="addedBill"></add-bill>
      @endif
      
    </div>
  </div>

</body>


</html>
