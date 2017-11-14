$(document).ready(function() {
  var textArea = document.querySelector('.new-tweet textarea');
  var spanText = document.getElementsByClassName('counter')
  var textLimit = 140;

  textArea.addEventListener('keyup', function(event) {
    var spanCounter = $(this).parent().find('.counter');
    var spanCounterLength = $(this).val().length;
    $(spanCounter).text(textLimit - spanCounterLength);

    if(spanCounterLength >= 140) {
      $(spanText).addClass('limit-reached');
    } else {
      $(spanText).removeClass('limit-reached');
    }
  });
});