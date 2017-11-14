$(document).ready(function() {
  var textarea = document.querySelector('.new-tweet textarea');
  var textLimit = 140;

  textarea.addEventListener('keyup', function(event) {
    //console.log(textLimit - $(this).val().length);
    var spanCounter = $(this).parent().find('.counter');
    $(spanCounter).text(textLimit - $(this).val().length);
  });

});