$(document).ready(function() {
  $("#created-tweet article").hover(function() {
   $("#created-tweet header, #created-tweet .icons").toggleClass("hovered");
  });
});