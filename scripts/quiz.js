
var questions = null;
var isQuizRunning = false;
var isClicked = false;

var startQuiz = document.getElementById("startQuiz");

startQuiz.addEventListener('click',function(){

    console.log("Działa kliknięcie!");
    if(!isQuizRunning){
        isQuizRunning = true;
        document.getElementById("timeProgress").classList.remove("invisible");
        document.getElementById("progress").classList.remove("invisible");
        document.getElementById("answers").classList.remove("collapse");

        document.querySelector(".questionText").classList.remove("textCenter");

        document.querySelector(".quizHeader").classList.add("invisible");

        startQuiz.classList.add("invisible");        
    }
    loadJSON(prepareQuiz);
});


function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'scripts/questions.json', true);
    xobj.onreadystatechange = function () {

        if (xobj.readyState == 4 ) {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);

}

var prepareQuiz = function (response) {

    questions = JSON.parse(response);
    console.log(questions);

    var waitForDataLoad = setInterval(function () {
        if (questions !== null) {
            question = questions[index];
            console.log(question);
            clearInterval(waitForDataLoad);
        }

    }, 10);
    
    var waitForFirstQuestion = setInterval(function(){
       
        if (question !== null) {

            showQuestion(question);
            myInterval = startInterval();
            clearInterval(waitForFirstQuestion);
            showScoreHistory();
        }
    },10);
}
// Call to function with anonymous callback
//loadJSON(prepareQuiz)



function showScoreHistory() {
    var history = JSON.parse(localStorage.getItem("resultHistory"));
    console.log("Zawartosc historii: ",JSON.parse(localStorage.getItem("resultHistory")));
    var i = 0;

    console.log("Działa funkcja showScoreHistory");
    for (i; i < history.length; i++) {
        var hItem = history[i];

        var row = document.createElement("tr");

        var data = document.createElement("td");
        data.appendChild(document.createTextNode(hItem.date));

        var score = document.createElement("td");
        score.appendChild(document.createTextNode(hItem.score));

        row.appendChild(data);
        row.appendChild(score);

        document.querySelector("#scoreTableBody").appendChild(row);
    }
}

function showQuestion(q) {
    document.getElementById("questionText").innerHTML = q.question;

    document.getElementById("a").innerHTML = q.answers[0];
    document.getElementById("b").innerHTML = q.answers[1];
    document.getElementById("c").innerHTML = q.answers[2];
    document.getElementById("d").innerHTML = q.answers[3];
}



//console.log("Typ historii: ", typeof(localStorage.getItem("resultHistory")));
if(JSON.parse(localStorage.getItem("resultHistory")) === null){
    localStorage.setItem("resultHistory","[]");
}


var resultHistory = JSON.parse(localStorage.getItem("resultHistory"));


localStorage.setItem("resultHistory", JSON.stringify(resultHistory));
localStorage.setItem("result", "0");

console.log(JSON.parse(localStorage.getItem("resultHistory")));
var index = 0;
var progresBarWidth = index + 1;
var question = null;
var time = 10;



function startInterval() {
    return (setInterval(function () {
        if (time > 0) {
            time = time - 1;
            document.getElementById("time").style.width = (time) * 10 + "%";
            document.getElementById("time").innerHTML = Math.round(time) + "s";
        }


        if (time <= 6) {
            document.getElementById("time").classList.remove("progress-bar-success");
            document.getElementById("time").classList.add("progress-bar-warning");
        }
        if (time <= 3) {
            document.getElementById("time").classList.remove("progress-bar-success");
            document.getElementById("time").classList.add("progress-bar-danger");
        }

        if (time <= 0) {
            document.getElementById("time").classList.remove("progress-bar-danger");
            document.getElementById("time").classList.remove("progress-bar-warning");
            document.getElementById("time").classList.add("progress-bar-success");
            index = index + 1;
            question = questions[index];
            showQuestion(question);
            time = 11;
            progresBarWidth = progresBarWidth + 1;
            document.getElementById("progress").innerHTML = progresBarWidth + "/10";
            document.getElementById("progress").style.width = progresBarWidth + '0%';
        }
    }, 1000))
}

var myInterval = null;



var answers = document.querySelectorAll(".list-group-item");
var i = 0;
for (i; answers.length; i++) {
    answers[i].addEventListener('click', function (e) {

    

    if(!isClicked){
        isClicked = true;
        
        clearInterval(myInterval);
        var userAnswer = e.target.textContent;

        if (userAnswer == question.correctAnswer) {
            e.target.style.backgroundColor = "green";


            var currentResult = parseInt(localStorage.getItem("result")) + 1;
            localStorage.setItem("result", currentResult)


        } else {
            e.target.style.backgroundColor = "red";
        }

        if (index < 9) {
            
            clearInterval(myInterval);
            time = 11;
            progresBarWidth = progresBarWidth + 1;

            document.getElementById("time").classList.remove("progress-bar-danger");
            document.getElementById("time").classList.remove("progress-bar-warning");
            document.getElementById("time").classList.add("progress-bar-success");
            myInterval = startInterval();


            setTimeout(function () {
                index = index + 1;
                question = questions[index];
                showQuestion(question);
                document.getElementById("progressBar").style.width = progresBarWidth + "0%";
                document.getElementById("progressBar").innerHTML = progresBarWidth + "/10";
                e.target.removeAttribute("style");
                isClicked = false;

            }, 1000);

        } else {
            time = 11;
            isClicked = true;
            setTimeout(function () {
                var summary = localStorage.getItem("result");
                document.querySelector(".score").innerHTML = "Udało Ci się ukończyć Quiz ! Twój wynik to : " + summary;
                e.target.removeAttribute("style");

                resultHistory = JSON.parse(localStorage.getItem("resultHistory"));


                var date = new Date();

                resultHistory.unshift({
                    date: date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + "/ " +
                        date.getHours() + ":" + (date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes())+ ":" + (date.getSeconds() > 10 ? date.getSeconds() : "0" + date.getSeconds()),
                    score: summary
                });

                localStorage.setItem("resultHistory", JSON.stringify(resultHistory));
                console.log(localStorage.getItem("resultHistory"));

                //document.querySelector(".questionText").classList.add("invisible");
                // document.querySelector(".answers").classList.add("invisible");

                showScoreHistory();

                document.getElementById("scoreHistory").classList.remove("invisible");

            }, 500);

        }

    }


    });



}




