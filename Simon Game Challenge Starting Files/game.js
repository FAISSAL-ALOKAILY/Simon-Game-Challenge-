var buttonColor = ["red", "blue", "green", "yellow"]; //colors for the batterns
//
var gamePattern = []; //the batterns will be displaied
var userClickedPattern = [];
//
var level = 0;
var started = false;

$(document).keydown(function() {
  if (!started) { //doing the method
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

//or $(".btn").on("click", function(){
//     alert("The paragraph was clicked.");
//   });
$(".btn").click(/* this is called handler */
function() {
  ///
  var userChosenColour = $(this).attr("id"); //the clicked button
  userClickedPattern.push(userChosenColour); //saving the clicked button

  playSound(userChosenColour);
  animatePress(userChosenColour); // the fading method
  ///
  checkAnswer(userClickedPattern.length - 1); //index
});
///
///
function checkAnswer(currentLevel) { //index
  //function start

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong"); //if he choose wong anser will make this sound
    ///
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
} //function ends

//
//
function nextSequence() {
  //function start
  userClickedPattern = [];

  level++; //attribute clerfied before we make it higher
  $("#level-title").text("Level " + level); //change the level text
  //
  var randomNumber = (Math.floor(Math.random() * 4)); // random number
  var randomChosenColour = buttonColor[randomNumber]; // will return the random color
  gamePattern.push(randomChosenColour); //throw identfying the variables we rturn it
  ///
  //cancalled//var holdRandomChosenColour = "#"+ randomChosenColour; to use in the tag collecting
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //flashing the one box in the screan

  // var audio = new Audio("sounds/" + randomChosenColour + ".mp3"); playing the color sound
  // audio.play();
  playSound(randomChosenColour);
  // function ends
}
//

function playSound(name) {
  //function start
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  //function ends
}

////

function animatePress(currentColour) {
  // function start
  $("#" + currentColour).addClass("pressed"); //add class pressed in the current color

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100); //it will remove it in the 100 (time)
  // function ends
}
///

////

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
