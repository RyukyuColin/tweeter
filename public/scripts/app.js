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
    $('#created-tweet').append(createdTweet);
  }
  return createdTweet;
}

$(document).ready(function() {
  //var tweet = renderTweets(data);

  function loadTweets() {
    $.getJSON('/tweets')
      .done((tweet) => {
        console.log(tweet);
        renderTweets(tweet);
      })
  }
  loadTweets();

  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   var formData = $('.tweet-form').serialize();

  //     console.log("form data", formData);
  //     console.log('Button clicked, performing ajax call...');
  //     $.ajax({
  //       type     : 'POST',
  //       url      : '/tweet',
  //       data     : formData,
  //       dataType : 'json',
  //       encode   : true
  //     })
  //       .done(function(data) {
  //         renderTweets(tweet);
  //         console.log(data);
  //       });
  //   });
  });








