/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Checks if character uner 140, and turns text red if over
function charCount() {
  let cs = 140 - $(this).val().length;
  if (cs < 0) {
    $("#charLimit").css("color", "red");
  } else {
    $("#charLimit").css("color", "black");
  }
  $("#charLimit").text(cs);
}
// Formats new tweet as HTML
function createTweetElement(data) {
  if (data.likes) {
  let template = `
  <div class="col-1"></div>
  <div class="col-10 opacParent">
    <div class="row tweetContentHead">
      <div class="col-2"><img class="bodyImg" src="${data.user.avatars.small}" alt=""></div>
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
        <div class="iconDiv">
          <i class="fas fa-flag icon" id="flag"></i><i class="fas fa-retweet icon"></i><i class="fas fa-heart icon"></i><i class="likeCount">${data.likes}</i>
        </div>
      </div>
      <div class="col-custom-1"></div>
    </div>
  </div>
  <div class="col-1"></div>
`;
  return template;
  } else {
      let template = `
      <div class="col-1"></div>
      <div class="col-10 opacParent">
        <div class="row tweetContentHead">
          <div class="col-2"><img class="bodyImg" src="${data.user.avatars.small}" alt=""></div>
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
            <div class="iconDiv">
              <i class="fas fa-flag icon" id="flag"></i><i class="fas fa-retweet icon"></i><i class="fas fa-heart icon"></i>
            </div>
          </div>
          <div class="col-custom-1"></div>
        </div>
      </div>
      <div class="col-1"></div>
    `;
    return template
  }
}

// Loads all documents in collection from MongoDB
function load() {
  $.getJSON("/tweets", function(data) {     
  $('#textAreaInput').val('');
  $('#appendTarget').empty();
  $('#charLimit').text("140")
  $('small:first').empty()
    data.forEach(element => {
      $("#appendTarget").prepend(createTweetElement(element));
    });
  });
}
//Jqury function
$(document).ready(function() {
  // loads current DB
  load();
  // Counts characters
  $("#textAreaInput").keyup(charCount);
  $("#textAreaInput").keydown(charCount);
  $(".collapse").on('shown.bs.collapse', function(event) {
    if ($(this).is(event.target)) {
      $("#textAreaInput").focus()
    }
  })
  $("#appendTarget").on('click', 'i.fa-heart', function() {
    let val = $(this).next().text()
    if (val == 1) {
      val = '0'
    } else {
      val = '1'
    }
    let show = $(this).parents(':has(.dateStamp)').first().find('.dateStamp').text();
    $.ajax('/tweets/inc', {
      method: "POST",
      data: {qdate: show, like: val},
    }).then(function(){
      return $.ajax('/tweets')
    }).then(load())
  });
  
  // When text box is submitted
  $("#target").submit(function(event)   {
    event.preventDefault();
    // Set variable as input text
    let serialized = $(this).serialize();
    // Checks length of string vs 140 and handles err accordingly
    if (serialized.length - 14 > 140) {
      $( "small:first" ).html('Tweet must be less than 140 characters').addClass("err");
      return false;
    } else if (!/\S/.test($("#textAreaInput").val())) {
      $( "small:first" ).html('Tweet must contain characters').addClass("err");
      return false;
    }
    // Posts Tweet to database then gets list of tweets to display
    $.ajax('/tweets', {
      method: "POST",
      data: serialized,
      complete: load
    }).then(this.noop().delay(300))
  });
});
// function load() {
//   $.getJSON("/tweets", function(data) {     
//   $('#textAreaInput').val('');
//   $('#appendTarget').empty();
//   $('#charLimit').text("140")
//   $('small:first').empty()
//     data.forEach(element => {
//       $("#appendTarget").prepend(createTweetElement(element));
//     });
//   });
// }
