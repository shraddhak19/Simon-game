var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickPattern = [];

var level = 0;
var started = false;


$(document).keydown(function() {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});


$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");

  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);

});


function nextSequence() {

  userClickPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random()) * 4);

  var randomChosenColor = buttonColors[randomNumber];
                                                                 // generate random button
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  // for button animation

  playSound(randomChosenColor);

}


function checkAnswer(currentLevel) {

  if (userClickPattern[currentLevel] == gamePattern[currentLevel]) {

    if (userClickPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press Any Key To Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // to generate sound
  audio.play();
}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
