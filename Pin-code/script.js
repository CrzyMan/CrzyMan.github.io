/***** Start DOM variables *****/
var pinpad = document.querySelector(".pinpad");
var buttons = pinpad.querySelectorAll("button");
var enterButton = document.getElementById("enterButton");
var display = document.getElementById("display");
var winMessage = document.getElementById("winMessage");
/***** End DOM variables *****/



/***** Start handling DOM interactions *****/
function makeButtonHandler(num){
    return function(){handleNumberPress(num)}
}

function updateDisplay(){
    display.value = currentAnswer;
}
/***** End handling DOM interactions *****/



/***** Start business logic *****/
var currentAnswer = "";
// Default answer
var encryptedAnswer = "8ef6e5ea68e21ce2f45ff7fb7614b57421b5e7d6b21d793d70178945af061c3b";

// If key is given, update the encrypted answer
if (!(window.location.search.indexOf("?key=")<0)){
	const key = window.location.search.slice(5);
	if (key.length == encryptedAnswer.length){
		encryptedAnswer = key;
	}
}

function answerIsCorrect(){
    return sha256(currentAnswer) === encryptedAnswer;
}

function showWrongAnswer(){
    pinpad.classList.add("wrongAnswer");
    setTimeout(function(){pinpad.classList.remove("wrongAnswer");}, 500);
    currentAnswer = "";
    updateDisplay();
}

const maxAnswerLength = 6;
function handleNumberPress(num){
    currentAnswer += "" + num;
    if (currentAnswer.length > maxAnswerLength) {
        currentAnswer = currentAnswer.slice(1);
    }
    updateDisplay();
}

function showWin(){
    winMessage.classList.remove("hidden");
}

(()=>{
	for (var i = 0; i < 10; i++){
		var j = (i+1)%10;
		buttons[i].onclick = makeButtonHandler(j);
	}
})()

enterButton.onclick = function(){
    if (answerIsCorrect()) {
        showWin();
    } else {
        showWrongAnswer();
    }
}
/***** End business logic *****/