// this identifies website in the createToken call below
Stripe.setPublishableKey('pk_xSVvtiPdphm6IMX4kgkDpjHZRrmOT');

function stripeResponseHandler(status, response) {
  if (response.error) {

      // show the errors on the form
      $(".payment-errors").text(response.error.message);
  	} else {
      var form$ = $("#payment-form");
      // token contains id, last4, and card type
      var token = response['id'];
      // insert the token into the form so it gets submitted to the server
      form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
      // and submit
      form$.get(0).submit();
  	}
}


$(document).ready(function() {
  $("#payment-form").submit(function(event) {
    // disable the submit button to prevent repeated clicks
    $('.submit-button').attr("disabled", "disabled"); // disable submit button
	//createToken returns immediately - the supplied callback submits the form if there are no errors
    Stripe.createToken({
        number: $('.card-number').val(),
        cvc: $('.card-cvc').val(),
        exp_month: $('.card-expiry-month').val(),
        exp_year: $('.card-expiry-year').val()
    }, stripeResponseHandler);
    return false; //submit from callback
  });
});

if (window.location.protocol === 'file:') {
                alert("stripe.js does not work when included in pages served over file:// URLs. Try serving this page over a webserver. Contact support@stripe.com if you need assistance.");
}