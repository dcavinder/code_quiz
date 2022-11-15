//variables connecting html elements to js
var openingStatement = document.querySelector("#opening_statement");
var intro = document.querySelector("#intro");
var startBtn = document.querySelector("#start_button");
var timeLeft = document.getElementById("timer");

var quizQuestions = document.querySelector("#quiz_questions");
var questionDisplay = document.querySelector("#question_display");

var optionsButtons = document.querySelectorAll(".options");
var option1 = document.querySelector("#option_1");
var option2 = document.querySelector("#option_2");
var option3 = document.querySelector("#option_3");
var option4 = document.querySelector("#option_4");

var answerCheck = document.querySelector("#answer_check");
var initials = document.querySelector("#initials");
var finalScore = document.querySelector("#final_score");
var scoreBoard = document.querySelector("#submit_page");
var submitScore = document.querySelector("#submit_score");
var highScores = document.querySelector("#highscores");
var userScore = document.querySelector("#user_score");
var scoreCheck = document.querySelector("#score_check");
var endQuiz = document.querySelector("#end_quiz");

var goBack = document.querySelector("#go_back");
var clearRecords = document.querySelector("#clear_records");

//object to hold questions and answers
var quizLibrary = [
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["a. JavaScript", "b. terminal", "c. for loops", "d. console.log"],
        answer: "d"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables:",
        options: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
        answer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store _____",
        options: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
        answer: "d"
    },
    {
        question: "The condition in an if/ else statement is enclosed with _____",
        options: ["a. quotes", "b. curly brackets", "c. parenthesis", "d. square brackets"],
        answer: "c"
    },
    {
        question: "Commonly used data types DO NOT include:",
        options: ["a. strings", "b. booleans", "c. alerts ", "d. numbers"],
        answer: "c"
    }
];

var secondsLeft = 60;
var questionNum = 0;
var totalScore = 0;
var questionCounter = 1;

//sets and starts timer
function startTimer() {
        
        var timerInterval = setInterval(function () {

          secondsLeft--;
          timeLeft.textContent = "Timer: " + secondsLeft;
    
            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                timeLeft.textContent = "Time's up!"; 
                endQuiz.textContent = "Time's up!";
                endQuiz();

            } else  if(questionCounter >= quizLibrary.length +1) {
                clearInterval(timerInterval);
                endQuiz();
                } 
    }, 1000);
}

//Click the button to start the quiz
function startQuiz () {
        intro.style.display = "none";
        quizQuestions.style.display = "block";
        questionNum = 0
        startTimer();
        nextQuestion(questionNum);
      
}

//displays quiz question and options
function nextQuestion (n) {
        questionDisplay.textContent = quizLibrary[n].question;
        option1.textContent = quizLibrary[n].options[0];
        option2.textContent = quizLibrary[n].options[1];
        option3.textContent = quizLibrary[n].options[2];
        option4.textContent = quizLibrary[n].options[3];
        questionNum = n;
}

//Checks answer
function checkAnswer(event) {
    event.preventDefault();
    console.log(event)
    answerCheck.style.display = "block";
    setTimeout(function () {
        answerCheck.style.display = 'none';
    }, 1000);

    if (quizLibrary[questionNum].answer == event.target.value) {
        answerCheck.textContent = "Way to go!"; 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 10;
        answerCheck.textContent = "Oops! Nice try but the answer is " + quizLibrary[questionNum].answer + " .";
    }

    if (questionNum < quizLibrary.length -1 ) {
        nextQuestion(questionNum +1);
    } else {
    displayScore();
}
questionCounter++;
}

// display users score
function displayScore() {
        quizQuestions.style.display = "none";
        scoreBoard.style.display = "block";
        console.log(scoreBoard);
        finalScore.textContent = "Your score is :" + totalScore ;
        timeLeft.style.display = "none"; 
};

// get score from local storage
function getScore () {
    var scoreList =localStorage.getItem("Scores");
    if (scoreList !== null ){
        updatedList = JSON.parse(scoreList);
        return updatedList;
    } else {
        updatedList = [];
    }
    return updatedList;
};


// renders score to score board
function renderScore () {
    userScore.innerHTML = "";
    userScore.style.display ="block";
    var highScores = sort();   
    var topTen = highScores.slice(0,10);

    for (var i = 0; i < topTen.length; i++) {
        var item = topTen[i];
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    userScore.appendChild(li);
    }
};

// rank score
function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

// push to the local storage
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("Scores", JSON.stringify(addedList));
};

function saveScore () {
    var scoreRecord ={
        user: initials.value,
        score: totalScore
    }
    addItem(scoreRecord);
    renderScore();
}

//start quiz
startBtn.addEventListener("click", startQuiz);

//click option, go to nxt question
optionsButtons.forEach(function(click){
    click.addEventListener("click", checkAnswer);
});

//save information and go to next page
submitScore.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    intro.style.display = "none";
    highScores.style.display = "block";
    quizQuestions.style.display ="none";
    saveScore();
});

//checks highscores
scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    intro.style.display = "none";
    scoreBoard.style.display = "none";
    highScores.style.display = "block";
    quizQuestions.style.display ="none";
    renderScore();
});

//return to main
goBack.addEventListener("click",function(event){
        event.preventDefault();
        intro.style.display = "none";
        scoreBoard.style.display = "none";
        highScores.style.display = "block";
        quizQuestions.style.display ="none";
        location.reload();
});

//clears local storage
clearRecords.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});

