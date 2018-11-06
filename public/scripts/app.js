/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Change .css to change the class instead of targeting css directly
function charCount() {
  let cs = 140-$(this).val().length
  if(cs < 0) {
    $('#charLimit').css("color", "red");
  } else {
    $('#charLimit').css("color", "black");
  }
  $('#charLimit').text(cs)
}
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

let html
function createTweetElement(data) {
  html = 
`<div class="col-1"></div>
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
<div class="col-1"></div>`
  return html
  }
$(document).ready(function() {
  $('#textAreaInput').keyup(charCount)
  $('#textAreaInput').keydown(charCount)
  data.forEach(element => {
    $('#appendTarget').append(createTweetElement(element))
  });
  $( "#target" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
    serialized = $(this).serialize();
    $.ajax('/', {
      method:'POST',
      data: serialized
    })
  });
});