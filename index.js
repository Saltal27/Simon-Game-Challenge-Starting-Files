function clickButton(color) {
    colorAudio = new Audio("/sounds/" + color + ".mp3");
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
    colorAudio.play();
}

$(document).one("keydown", function () {
    playNewSound();
});

var sequence = [];
var answers = [];
var colors = ["blue", "green", "red", "yellow"];
var level = 0;

function playNewSound() {
    var newAudioNumber = Math.floor(Math.random() * 4);
    var newColor = colors[newAudioNumber];
    sequence.push(newColor);
    clickButton(newColor);
    level++;
    $("#level-title").text("Level " + level)
}

$(".btn").on("click", function (event) {
    var clickedColor = event.target.id;
    clickButton(clickedColor);
    answers.push(clickedColor);
    var index = answers.length - 1;
    if (answers[index] !== sequence[index]) {
        var wrongAudio = new Audio("/sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        // Reset the game
        sequence = [];
        answers = [];
        level = 0;
        $("#level-title").text("Game Over");
    } else if (answers.length === sequence.length) {
        // Player's sequence matches the generated sequence
        if (answers.length === level) {
            // Player has completed the level
            setTimeout(function () {
                playNewSound();
            }, 1000);
            answers = []; // Clear the answers for the next level
        }
    }
});