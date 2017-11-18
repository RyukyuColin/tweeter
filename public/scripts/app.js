/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function toggleTextarea() {
    var textForm = $('.new-tweet');
    var composeButton = $('#compose');

    composeButton.click(function(event) {
      event.preventDefault;
      $(textForm).slideToggle( "slow", function() {
        $('.tweet-text').focus();
      });
    });
  }

  // Changes the time inside the tweet from milliseconds to readable form.
  function changeTime(ms) {
    var days = Math.floor((Date.now() - ms) / (1000*60*60*24));

    if(days < 1) {
      return 'Today';
    } else if (days === 1) {
        return 'Yesterday';
    } else {
        return `${days} days ago`;
    }
  }

  // Creates the nodes for new tweets and inserts the corresponding data.
  function createTweetElement(tweetData) {
    var faviIcons = '<i class="fa fa-flag"></i><i class="fa fa-retweet"></i><i class="fa fa-heart"></i>';

    var newTweet = $('<article>').append($('<header>'));
    var time = changeTime(tweetData.created_at);

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
    $('#created-tweet').empty();

    for(var tweet in tweets) {
      var createdTweet = createTweetElement(tweets[tweet]);
      $('#created-tweet').prepend(createdTweet);
    }
    return;
  }

  function loadTweets() {
    $.getJSON('/tweets')
      .done((tweet) => {
        renderTweets(tweet);
      });
  }

  loadTweets();

  // Validates whether the text area is empty or over 140 characters.
  function tweetValidation(data) {
    var submitText = $('.tweet-text').val();
    var errorDiv = $('<div>').addClass('error');

    $('div.error').remove();

    if(!submitText) {
      $('#created-tweet').prepend($(errorDiv));
      errorDiv.text('Please enter a tweet.');
      errorDiv.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      return true;
    }
    if(submitText.length > 140) {
      $('#created-tweet').prepend($(errorDiv));
      errorDiv.text('Please keep tweet length under 140 characters.');
      errorDiv.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      return true;
    }
  }

  function tweetSubmit() {

    $('.button').on('click', function(event) {
      event.preventDefault();
      var formData = $('.tweet-text').serialize();

      if(tweetValidation(formData)) {
        return;
      }

      $.ajax({
        type     : 'POST',
        url      : 'tweets',
        data     : formData
      })
        .done(function(data) {
          loadTweets(data);
          $('.tweet-text').val('');
          $('.counter').text('140');
          $('.counter').removeClass('limit-reached');
        });
    });
  }

  toggleTextarea();
  tweetSubmit();

});
