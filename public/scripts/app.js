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
data={
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
}
console.log(data)
function createTweetElement() {
  let html = 
`<div class="row BodyRow1">
<div class="col-3"></div>
<div class="col-6">
  <div class="row subrow">
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
  </div>
</div>
<div class="col-3"></div>
</div>`
  console.log(html)
  }
  createTweetElement()
$(document).ready(function() {
  $('#subButton').on('click', function() {
    console.log('fired')
  })
  $('#textAreaInput').keyup(charCount)
  $('#textAreaInput').keydown(charCount)
})