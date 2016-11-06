$(document).foundation();

// ---------------
// FUNTIONS
// ---------------
function toCurrency(number) {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function hideBetterPlan(element) {
  $(element).removeClass('plans__header--better');
  $(element).children('.plans__title').removeClass('plans__title--better');
  $(element).children('.plans__subtitle').removeClass('plans__subtitle--better');
  $(element).children('.plans__title').children('.plans__best').hide();
  $(element + '-affiliate').children('.plans__affiliate-button').hide();

  if (Foundation.MediaQuery.current === 'small') {
    $(element + '-col').hide();
  }
}

function showBetterPlan(element) {
  $(element).addClass('plans__header--better');
  $(element).children('.plans__title').addClass('plans__title--better');
  $(element).children('.plans__subtitle').addClass('plans__subtitle--better');
  $(element).children('.plans__title').children('.plans__best').show().css('display: block');
  $(element + '-affiliate').children('.plans__affiliate-button').show();

  if (Foundation.MediaQuery.current === 'small') {
    $(element + '-col').show();
  }
}
// ---------------

$(document).ready(function() {
  // When slider moves
  $('.slider').on('moved.zf.slider', function(){
    // Change sales with slider value
    var sales = $(this).children('.slider-handle').attr('aria-valuenow');
    var salesNumber = toCurrency(sales);

    $('.sales__number').html(salesNumber);

    // Calculate paid monthly
    var paidMonthlyBasic = 29 + (sales * 0.02);
    var paidMonthlyShopify = 79 + (sales * 0.01);
    var paidMonthlyAdvanced = 299 + (sales * 0.005);

    // Update paid monthly values
    $('#plan-basic-number').html(toCurrency(paidMonthlyBasic));
    $('#plan-shopify-number').html(toCurrency(paidMonthlyShopify));
    $('#plan-advanced-number').html(toCurrency(paidMonthlyAdvanced));

    if (paidMonthlyBasic < paidMonthlyShopify) {
      hideBetterPlan('.shopify-plan');
      hideBetterPlan('.advanced-plan');
      showBetterPlan('.basic-plan');
    } else if (paidMonthlyShopify < paidMonthlyAdvanced){
      hideBetterPlan('.basic-plan');
      hideBetterPlan('.advanced-plan');
      showBetterPlan('.shopify-plan');
    } else {
      hideBetterPlan('.basic-plan');
      hideBetterPlan('.shopify-plan');
      showBetterPlan('.advanced-plan');
    }
  });
});
