/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Change .css to change the class instead of targeting css directly
function charCount() {
  let cs = 140 - $(this).val().length;
  if (cs < 0) {
    $("#charLimit").css("color", "red");
  } else {
    $("#charLimit").css("color", "black");
  }
  $("#charLimit").text(cs);
}
// check temp lit spacing
function createTweetElement(data) {
  let template = `
  <div class="col-1"></div>
  <div class="col-10 opacParent">
    <div class="row tweetContentHead">
      <div class="col-2"><img class="bodyImg" src="/images/bird.png" alt=""></div>
      <div class="col-8">
        <h3 class="tweetH3">${data.user.name}</h3>
      </div>
      <div class="col-2"><span class="miniEmail">${data.user.handle}</span></div>
    </div>
    <div class="row tweetContentBody">
      <div class="col-12">
        <p class="tweetContent">${data.content.text}</p>
      </div>
    </div>
    <div class="row tweetContentFoot">
      <div class="col-custom-1"></div>
      <div class="col-custom-22">
        <p class="dateStamp">${data.created_at}</p>
      </div>
      <div class="col-custom-1"></div>
    </div>
  </div>
  <div class="col-1"></div>
`;
  return template;
}
function load() {
  $.getJSON("/tweets", function(data) {
    data.forEach(element => {
      $("#appendTarget").append(createTweetElement(element));
    });
  });
}
$(document).ready(function() {
  $("#textAreaInput").keyup(charCount);
  $("#textAreaInput").keydown(charCount);
  $("#target").submit(function(event)   {
    alert("Handler for .submit() called.");
    event.preventDefault();
    let serialized = $(this).serialize();
    if (serialized.length - 14 > 140) {
      alert("bad length");
      return false;
    } else if (!/\S/.test($("#textAreaInput").val())) {
      alert("no content");
      return false;
    }
    $.ajax('/tweets', {
      method: "POST",
      data: serialized,
    }).then(function(){
      return $.ajax('/tweets')
    }).then(load())
  });
});
