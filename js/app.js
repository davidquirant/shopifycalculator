$(document).foundation();

// ---------------
// FUNCTIONS
// ---------------
// Transform a number to string with currency format
function toCurrency (number) {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// Gets value of the slider
function sliderValue(sliderParent) {
  var value = $(sliderParent).children('.slider-handle').attr('aria-valuenow');
  return value;
}

// Transform the slider value to string with currency format
function sliderValueToCurrency(sliderParent, sliderNumber) {
  var value = sliderValue(sliderParent);
  var valueNumber = toCurrency(value);
  $(sliderNumber).html(valueNumber);
}

// Calculates cost for plans
function calculatePlans() {
  var average = sliderValue('#slider-average');
  var online = sliderValue('#slider-online');
  var person = sliderValue('#slider-person');
  var sales = sliderValue('#slider-sales');
  var retail = 0;
  var period = 1;
  var basic = 29;
  var shopify = 79;
  var advanced = 299;
  // var plus = 2000;
  var discount = 0;
  var payBasic = 0;
  var payShopify = 0;
  var payAdvanced = 0;
  // var payPlus = 0;
  var payment;

  if ($('#retail').prop('checked')) {
    retail = 49;
  }

  if ($('#button-monthly').hasClass('pay-plan--active')) {
    period = 1;
    discount = 0;
  } else if ($('#button-annual').hasClass('pay-plan--active')) {
    period = 12;
    discount = 0.1;
  } else if ($('#button-biennial').hasClass('pay-plan--active')) {
    period = 24;
    discount = 0.2;
  }

  if ($('#payments-shopify').hasClass('payments--active')) {
    payment = 'shopify';
  } else {
    payment = 'external';
  }

  if(payment === 'shopify') {
    payBasic = ((((average * 0.029) + 0.3) * online) + ((average * 0.027) * person) + ((basic + retail) - ((basic + retail) * discount))) * period;
    payShopify = ((((average * 0.026) + 0.3) * online) + ((average * 0.025) * person) + ((shopify + retail) - ((shopify + retail) * discount))) * period;
    payAdvanced = ((((average * 0.024) + 0.3) * online) + ((average * 0.024) * person) + ((advanced + retail) - ((advanced + retail) * discount))) * period;
    // payPlus = (plus - (plus * discount)) * period;
  } else {
    payBasic = (((basic + retail) - ((basic + retail) * discount)) + (sales * 0.02)) * period;
    payShopify = (((shopify + retail) - ((shopify + retail) * discount)) + (sales * 0.01)) * period;
    payAdvanced = (((advanced + retail) - ((advanced + retail) * discount)) + (sales * 0.005)) * period;
    // payPlus = (plus - (plus * discount)) * period;
  }

  $('.plan__pay-basic').html(toCurrency(payBasic.toFixed(0)));
  $('.plan__pay-shopify').html(toCurrency(payShopify.toFixed(0)));
  $('.plan__pay-advanced').html(toCurrency(payAdvanced.toFixed(0)));
  // $('.plan__pay-plus').html(toCurrency(payPlus.toFixed(0)));

  if (online > 0 || person > 0 || sales > 0) {
    // if ((payBasic < payShopify) && (payBasic < payAdvanced) && (payBasic < payPlus)) {
    if ((payBasic < payShopify) && (payBasic < payAdvanced)) {
      $('#plan-basic').find('.plan__ribbon').show();
      $('#plan-shopify').find('.plan__ribbon').hide();
      $('#plan-advanced').find('.plan__ribbon').hide();
      // $('#plan-plus').find('.plan__ribbon').hide();

      $('#plan-basic').addClass('plan--best').find('.plan__header').addClass('plan__header--best');
      $('#plan-shopify').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      $('#plan-advanced').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      // $('#plan-plus').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');

      $('#plan-basic').find('.button').removeClass('disabled');
      $('#plan-shopify').find('.button').addClass('disabled');
      $('#plan-advanced').find('.button').addClass('disabled');
      // $('#plan-plus').find('.button').addClass('disabled');
    // } else if ((payShopify < payBasic) && (payShopify < payAdvanced) && (payShopify < payPlus)) {
    } else if ((payShopify < payBasic) && (payShopify < payAdvanced)) {
      $('#plan-basic').find('.plan__ribbon').hide();
      $('#plan-shopify').find('.plan__ribbon').show();
      $('#plan-advanced').find('.plan__ribbon').hide();
      // $('#plan-plus').find('.plan__ribbon').hide();

      $('#plan-basic').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      $('#plan-shopify').addClass('plan--best').find('.plan__header').addClass('plan__header--best');
      $('#plan-advanced').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      // $('#plan-plus').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');

      $('#plan-basic').find('.button').addClass('disabled');
      $('#plan-shopify').find('.button').removeClass('disabled');
      $('#plan-advanced').find('.button').addClass('disabled');
      $('#plan-plus').find('.button').addClass('disabled');
    // } else if ((payAdvanced < payBasic) && (payAdvanced < payShopify) && (payAdvanced < payPlus)) {
    } else if ((payAdvanced < payBasic) && (payAdvanced < payShopify)) {
      $('#plan-basic').find('.plan__ribbon').hide();
      $('#plan-shopify').find('.plan__ribbon').hide();
      $('#plan-advanced').find('.plan__ribbon').show();
      $('#plan-plus').find('.plan__ribbon').hide();

      $('#plan-basic').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      $('#plan-shopify').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      $('#plan-advanced').addClass('plan--best').find('.plan__header').addClass('plan__header--best');
      $('#plan-plus').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');

      $('#plan-basic').find('.button').addClass('disabled');
      $('#plan-shopify').find('.button').addClass('disabled');
      $('#plan-advanced').find('.button').removeClass('disabled');
      // $('#plan-plus').find('.button').addClass('disabled');
    } else {
      $('#plan-basic').find('.plan__ribbon').hide();
      $('#plan-shopify').find('.plan__ribbon').hide();
      $('#plan-advanced').find('.plan__ribbon').hide();
      // $('#plan-plus').find('.plan__ribbon').show();

      $('#plan-basic').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      $('#plan-shopify').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      $('#plan-advanced').removeClass('plan--best').find('.plan__header').removeClass('plan__header--best');
      // $('#plan-plus').addClass('plan--best').find('.plan__header').addClass('plan__header--best');

      $('#plan-basic').find('.button').addClass('disabled');
      $('#plan-shopify').find('.button').addClass('disabled');
      $('#plan-advanced').find('.button').addClass('disabled');
      // $('#plan-plus').find('.button').removeClass('disabled');
    }
  }
}

function showButtonPayPlan (show, hide1, hide2) {
  if (!$(show).hasClass('pay-plan--active')) {
    $(show).removeClass('hollow').addClass('pay-plan--active');
    $(hide1).removeClass('pay-plan--active').addClass('hollow');
    $(hide2).removeClass('pay-plan--active').addClass('hollow');
  }
}

function showButtonPayments (buttonShow, buttonHide, sliderShow, sliderHide) {
  if (!$(buttonShow).hasClass('payments--active')) {
    $(buttonShow).removeClass('hollow').addClass('payments--active');
    $(buttonHide).removeClass('payments--active').addClass('hollow');
    $(sliderShow).show();
    $(sliderHide).hide();
  }
}
// ---------------


$(document).ready(function() {
  $('#payments-external').click(function() {
    showButtonPayments('#payments-external', '#payments-shopify', '#sliders-external', '#sliders-shopify');
    calculatePlans();

    // Show/Hide content credit card/fees
    if ($(this).hasClass('payments--active')) {
      $('.plan__credit-basic').html('<p>None</p>');
      $('.plan__fees-basic').html('<p>2.0%</p>');

      $('.plan__credit-shopify').html('<p>None</p>');
      $('.plan__fees-shopify').html('<p>1.0%</p>');

      $('.plan__credit-advanced').html('<p>None</p>');
      $('.plan__fees-advanced').html('<p>0.5%</p>');
    }
  });

  $('#payments-shopify').click(function() {
    showButtonPayments('#payments-shopify', '#payments-external', '#sliders-shopify', '#sliders-external');
    calculatePlans();

    if ($(this).hasClass('payments--active')) {
      $('.plan__credit-basic').html('<p>Online<br>2.9% + 30¢</p><p>In person<br>2.7% + 0¢</p>');
      $('.plan__fees-basic').html('<p>None</p>');

      $('.plan__credit-shopify').html('<p>Online<br>2.6% + 30¢</p><p>In person<br>2.5% + 0¢</p>');
      $('.plan__fees-shopify').html('<p>None</p>');

      $('.plan__credit-advanced').html('<p>Online<br>2.4% + 30¢</p><p>In person<br>2.4% + 0¢</p>');
      $('.plan__fees-advanced').html('<p>None</p>');
    }
  });

  $('#slider-average').on('moved.zf.slider', function(){
    sliderValueToCurrency(this, '#slider-average-number');
    calculatePlans();
  });

  $('#slider-online').on('moved.zf.slider', function(){
    sliderValueToCurrency(this, '#slider-online-number');
    calculatePlans();
  });

  $('#slider-person').on('moved.zf.slider', function(){
    sliderValueToCurrency(this, '#slider-person-number');
    calculatePlans();
  });

  $('#slider-sales').on('moved.zf.slider', function(){
    sliderValueToCurrency(this, '#slider-sales-number');
    calculatePlans();
  });

  $('#button-monthly').click(function() {
    showButtonPayPlan(this, '#button-annual', '#button-biennial');
    calculatePlans();
  });

  $('#button-annual').click(function() {
    showButtonPayPlan(this, '#button-monthly', '#button-biennial');
    calculatePlans();
  });

  $('#button-biennial').click(function() {
    showButtonPayPlan(this, '#button-monthly', '#button-annual');
    calculatePlans();
  });

  $("#retail").change(function() {
    calculatePlans();
  });
});
