//I drew all of these :DD
//Lists of images
var friendlyTanks = getColumn("BlueTankList2", "tankImage");
var enemyTanks = getColumn("RedTankList2", "tankImage");
var Environment = getColumn("EnvironmentList", "objImage");
//Variables
var scorelimit = 10;
var score = 0;
var health = 5;
var seconds = 0;
//Sets screen to play screen, plays music and starts the timer.
onEvent("playButton", "click", function( ) {
  timedLoop(1000, function() {
    setText("timeText2", seconds);
    seconds = seconds + 1;
  });
  timedLoop(60000, function() {
    loseScreen();
  });
  playSound("assets/category_music/clear_evidence_loop1.mp3", true);
  setScreen("PlayScreen");
  resetGame();
});
//Takes too and from instructions sceen.
onEvent("InstructionsButton", "click", function( ) {
  setScreen("InstructionScreen");
});
onEvent("HomeButtonInstructions", "click", function( ) {
  setScreen("HomeScreen");
});
//Blue Tanks Click, decreases health. Plays reload effect.
onEvent("blueTank0", "click", function( ) {
  moveAll();
  reload();
  healthDown();
});
onEvent("blueTank1", "click", function( ) {
  moveAll();
  reload();
  healthDown();
});
onEvent("blueTank2", "click", function( ) {
  moveAll();
  reload();
  healthDown();
});
//Red Tanks Click, increases score. Plays reload effect.
onEvent("redTank0", "click", function( ) {
  moveAll();
  reload();
  scoreup(score);
  score = score + 1;
});
onEvent("redTank1", "click", function( ) {
  moveAll();
  reload();
  scoreup(score);
  score = score + 1;
});
onEvent("redTank2", "click", function( ) {
  moveAll();
  reload();
  scoreup(score);
  score = score + 1;
});
//Resets the score, health, and timer of the game.
//Changes screen to homescreen.
onEvent("resetgameButton", "click", function( ) {
  resetGame();
  resetTime();
  setScreen("HomeScreen");
});
//Increases score.
//If score is equal or greater than 20, then the game gets set to the 
function scoreup(score) {
  if (score >= scorelimit) {
    setScreen("endscreen");
    setProperty("endscreenImage", "image", "assets/TDforWin.png");
    setProperty("endscreenLabel", "text", "You Win!");
    setProperty("endscreenLabel", "text-color", rgb(0, 123, 255));
    setProperty("endscreenLabel", "border-color", rgb(0, 123, 255));
    playSound("assets/category_music/8bit_small_win.mp3", false);
    stopSound("assets/category_music/clear_evidence_loop1.mp3");
    stopTimedLoop();
  } else {
    setText("scoreText2", score);
    playSound("assets/category_explosion/radioactive_zombie_explode_2.mp3", false);
  }
}
//Decreases health, checks if health is equal to zero, if health is zero then it ends the game with setting the end screen to a loss.
function healthDown() {
  health = health - 1;
  setText("HPtext2", health);
  if (health == 0) {
    loseScreen();
  } else {
    playSound("assets/category_alerts/vibrant_game_negative_affirmation.mp3", false);
  }
}
//Sets the end screen to the lose theme.
function loseScreen() {
  setScreen("endscreen");
  setProperty("endscreenImage", "image", "assets/DestroyedTD.png");
  setProperty("endscreenLabel", "text", "You Lose.");
  setProperty("endscreenLabel", "text-color", rgb(255, 42, 45));
  setProperty("endscreenLabel", "border-color", rgb(255, 42, 45));
  playSound("assets/category_music/8bit_game_over_2.mp3", false);
  stopSound("assets/category_music/clear_evidence_loop1.mp3");
}
// Sets screen to black to give the effect of reloading.
function reload() {
  showElement("reloadscreen");
  showElement("reloadimage");
  setTimeout(function() {
    playSound("assets/category_collect/retro_game_health_pickup_1.mp3", false);
    hideElement("reloadscreen");
    hideElement("reloadimage");
  }, 1250);
}
//Moves all images onscreen to a random x and y axis when called.
function moveAll() {
  if (score < 19) {
    for (var j = 0; j < 8; j++) {
      setProperty("tree" + j, "x", randomNumber(50, 230));
      setProperty("tree" + j, "y", randomNumber(40, 380));
      setImageURL("tree" + j, Environment[(randomNumber(0, Environment.length-1))]);
    }
    for (var i = 0; i < 3; i++) {
      setProperty("blueTank" + i, "x", randomNumber(50, 230));
      setProperty("blueTank" + i, "y", randomNumber(40, 380));
      setImageURL("blueTank" + i, friendlyTanks[(randomNumber(0, friendlyTanks.length-1))]);
      setProperty("redTank" + i, "x", randomNumber(50, 230));
      setProperty("redTank" + i, "y", randomNumber(40, 380));
      setImageURL("redTank" + i, enemyTanks[(randomNumber(0, enemyTanks.length-1))]);
    }
  }
}
//Resets the timer of the loop back to zero.
function resetTime() {
  seconds = 0;
  stopTimedLoop();
}
//Resets the score back to 0, and the Hp back to 10.
function resetGame() {
  health = 5;
  score = 0;
  setText("scoreText2", 0);
  setText("HPtext2", 5);
  for (var i = 0; i < 3; i++) {
    setProperty("blueTank" + i, "x", randomNumber(50, 230));
    setProperty("blueTank" + i, "y", randomNumber(40, 380));
    setImageURL("blueTank" + i, friendlyTanks[(randomNumber(0, friendlyTanks.length-1))]);
    setProperty("redTank" + i, "x", randomNumber(50, 230));
    setProperty("redTank" + i, "y", randomNumber(40, 380));
    setImageURL("redTank" + i, enemyTanks[(randomNumber(0, enemyTanks.length-1))]);
  }
}
