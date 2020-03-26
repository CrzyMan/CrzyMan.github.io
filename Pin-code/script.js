var pinpad = document.querySelector(".pinpad");
var buttons = pinpad.querySelectorAll("button");
var enterButton = document.getElementById("enterButton");
var display = document.getElementById("display");
var winMessage = document.getElementById("winMessage");

function makeButtonHandler(num){
    return function(){handleNumberPress(num)}
}

function handleNumberPress(num){
    currentAnswer += "" + num;
    if (currentAnswer.length > 5) {
        currentAnswer = currentAnswer.slice(1);
    }
    updateDisplay();
}

function updateDisplay(){
    display.value = currentAnswer;
}

var currentAnswer = "";
var encryptedAnswer = "8ef6e5ea68e21ce2f45ff7fb7614b57421b5e7d6b21d793d70178945af061c3b";

function answerIsCorrect(){
    return sha256(currentAnswer) === encryptedAnswer;
}

function showWrongAnswer(){
    pinpad.classList.add("wrongAnswer");
    setTimeout(function(){pinpad.classList.remove("wrongAnswer");}, 500);
    currentAnswer = "";
    updateDisplay();
}

function showWin(){
    winMessage.classList.remove("hidden");
}

for (var i = 0; i < 10; i++){
    var j = (i+1)%10;
    buttons[i].onclick = makeButtonHandler(j);
}

enterButton.onclick = function(){
    if (answerIsCorrect()) {
        showWin();
    } else {
        showWrongAnswer();
    }
}