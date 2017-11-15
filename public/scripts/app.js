/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 var faviIcons = '<i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i>';

function changeTime(ms) {
  return days = Math.floor((Date.now() - ms) / (1000*60*60*24));
}

function createTweetElement(tweetData) {
  var newTweet = $('<article>').append($('<header>'));
  var time = `${changeTime(tweetData.created_at)} days ago`;

  var header = newTweet.children('header');
  header.append($('<img />', { src: tweetData.user.avatars.small, class: 'tweet-image', alt: 'MyAlt' }));
  header.append($('<div class="tweet-name">').text(tweetData.user.name));
  header.append($('<div class="tweet-id">').text(tweetData.user.handle));

  newTweet.append($('<div class="written-tweet">').text(tweetData.content.text));

  newTweet.append($('<footer class="clearfix">'));
  var footer = newTweet.children('footer');
  footer.append($('<div class="time">').text(time));
  footer.append($('<div class="icons">').append(faviIcons));

  return newTweet;
}

function renderTweets(tweets) {
  for(var tweet in tweets) {
    var createdTweet = createTweetElement(tweets[tweet]);
    $('#created-tweet').prepend(createdTweet);
  }
  return createdTweet;
}

$(document).ready(function() {
  //var tweet = renderTweets(data);

  function loadTweets() {
    $.getJSON('/tweets')
      .done((tweet) => {
        //console.log(tweet[0].content.text);
        renderTweets(tweet);
      })
  }
  loadTweets();

  function tweetValidation(data) {
    var submitText = $('#tweet-form').val();
    var errorDiv = $('<div>').addClass('error');

    $('div.error').remove();

    if(!submitText) {
      $('#created-tweet').prepend($(errorDiv));
      errorDiv.text('Please enter a tweet.');
      return true;
    }
    if(submitText.length > 140) {
      $('#created-tweet').prepend($(errorDiv));
      errorDiv.text('Please keep tweet length to 140 characters.');
      return true;
    }
  }

  function tweetSubmit() {
    $('.button').on('click', function(event) {
      event.preventDefault();

      if(tweetValidation(formData) === true) {
        return;
      }

      var formData = $('#tweet-form').serialize();
      $.ajax({
        type     : 'POST',
        url      : 'tweets',
        data     : formData
      })
        .done(function(data) {
          loadTweets(data);
          $('#tweet-form').val('');
        });
    });
  }
  tweetSubmit();
});









