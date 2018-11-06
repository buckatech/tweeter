/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function charCount() {
  let cs = 140-$(this).val().length
  if(cs < 0) {
    $('#charLimit').css("color", "red");
  } else {
    $('#charLimit').css("color", "black");
  }
  $('#charLimit').text(cs)
}

$(document).ready(function() {
  $('#subButton').on('click', function() {
    console.log('fired')
  })
  $('#textAreaInput').keyup(charCount)
  $('#textAreaInput').keydown(charCount)
})