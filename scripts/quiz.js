var questions = [
    {
        "id":1,
         "question": "Ile wynosi 2+2 ?",
         "answers": [4,2,6,1],
         "correctAnswer": "4"
    },
    {
        "id":2,
         "question": "Jaka jest stolica Polski?",
         "answers": ["Kraków","Tarnów","Warszawa","Gdańsk"],
         "correctAnswer": "Warszawa"
    },
    {
        "id":3,
         "question": "Najdłuższa rzeka w Polsce to ...",
         "answers": ["Warta","Odra","Bug","Wisła"],
         "correctAnswer": "Wisła"
    },
    {
        "id":4,
         "question": "Ile stanów ma USA?",
         "answers": [51,10,0,120],
         "correctAnswer": "51"
    },
    {
        "id":5,
         "question": "Jak miał na imię główny bohater serialu Wikingowie?",
         "answers": ["Ragnar","Horik","Lagherta","Floki"],
         "correctAnswer": "Ragnar"
    },
    {
        "id":6,
         "question": "Ile w Polsce jest województw ?",
         "answers": [12,16,44,67],
         "correctAnswer": 16
    },
    {
        "id":7,
         "question": "Co to jest nic?",
         "answers": ["to poprostu nic","a co to nic","no nic","Pól litra na dwoch"],
         "correctAnswer": "Pól litra na dwoch"
    },
    {
        "id":8,
         "question": "Kto jest mistrzem tego samego oręża, w jakim specjalizowała się mitologiczna Artemida?",
         "answers": ["Zorro","Legolas","Don Kichot","Longinus Podbipięta"],
         "correctAnswer": "Legolas"
    },
    {
        "id":9,
         "question": "Likier maraskino produkuje się z maraski, czyli odmiany:",
         "answers": ["Wiśni", "Jabłoni","Figi","Gruszy"],
         "correctAnswer": "Wiśni"
    },
    {
        "id":10,
         "question": "Skąd pochodził Conan Barbarzyńca?",
         "answers": ["Z Rivi","Z Mordoru" , "Z oz" , "Z Cimmerri"],
         "correctAnswer": "Z Cimmerri"
    }
]

function showScoreHistory(){
    var history = JSON.parse(localStorage.getItem("resultHistory"));
    console.log(history);
    var i=0;

    console.log("Działa funkcja showScoreHistory");
    for(i;i<history.length;i++){
        var hItem = history[i];
        
        var row = document.createElement("tr");

        var data = document.createElement("td");
        data.appendChild( document.createTextNode(hItem.date) );

        var score = document.createElement("td");
        score.appendChild( document.createTextNode(hItem.score) );

        row.appendChild(data);
        row.appendChild(score);

        document.querySelector("#scoreTableBody").appendChild(row);
    }
}
function showQuestion(q){
    document.getElementById("questionText").innerHTML = q.question;

    document.getElementById("a").innerHTML = q.answers[0];
    document.getElementById("b").innerHTML = q.answers[1];
    document.getElementById("c").innerHTML = q.answers[2];
    document.getElementById("d").innerHTML = q.answers[3];
}

//localStorage.setItem("resultHistory", JSON.stringify([]));

var resultHistory = JSON.parse(localStorage.getItem("resultHistory"));
localStorage.setItem("resultHistory", JSON.stringify(resultHistory));
localStorage.setItem("result","0");
var index = 0;

var progresBarWidth = index+1;
var question = questions[index];
showQuestion(question);

var time = 10;


function startInterval(){
    return(setInterval(function(){
        if(time > 0){
            time = time -1;
            document.getElementById("time").style.width = (time)*10 +"%";
            document.getElementById("time").innerHTML =  time+"s";
        }
    
    
        if(time <=6){
           document.getElementById("time").classList.remove("progress-bar-success");
           document.getElementById("time").classList.add("progress-bar-warning");
        }
        if(time <=3){
           document.getElementById("time").classList.remove("progress-bar-success");
           document.getElementById("time").classList.add("progress-bar-danger");
        }
    
        if(time<=0){
            document.getElementById("time").classList.remove("progress-bar-danger");
            document.getElementById("time").classList.remove("progress-bar-warning");
            document.getElementById("time").classList.add("progress-bar-success");
            index = index+1;
            question = questions[index];
            showQuestion(question);
            time=11;
            progresBarWidth = progresBarWidth+1;
            document.getElementById("progress").innerHTML = progresBarWidth + "/10";
            document.getElementById("progress").style.width = progresBarWidth + '0%';
        }
    },1000))
}

var myInterval = startInterval();



var answers = document.querySelectorAll(".list-group-item");
var i=0;
for(i;answers.length ; i++){
    answers[i].addEventListener('click',function(e){
        
        clearInterval(myInterval);
         var userAnswer = e.target.textContent;

         if(userAnswer == question.correctAnswer ){
            e.target.style.backgroundColor = "green";  
            /*document.getElementById(id).classList.add("succes");
            document.getElementById(id).classList.remove("succes");*/

             var currentResult =  parseInt(localStorage.getItem("result")) +1;          
             localStorage.setItem("result",currentResult)

            // localStorage.setItem("result")
         }
         else{
            e.target.style.backgroundColor = "red";
         }

         if(index < 9){
                clearInterval(myInterval);
                time=11;
                progresBarWidth = progresBarWidth+1;               

                document.getElementById("time").classList.remove("progress-bar-danger");
                document.getElementById("time").classList.remove("progress-bar-warning");
                document.getElementById("time").classList.add("progress-bar-success");
                myInterval = startInterval();          


             setTimeout(function(){
                index = index+1;               
                question = questions[index];
                showQuestion(question);
                document.getElementById("progress").style.width = progresBarWidth+"0%";
                document.getElementById("progress").innerHTML = progresBarWidth + "/10";
                e.target.removeAttribute("style");     
              
             },1000);
           
         }
         else{
            time=11;
            
            setTimeout(function(){
                var summary = localStorage.getItem("result");
                document.querySelector(".score").innerHTML = "Udało Ci się ukończyć Quiz ! Twój wynik to : " + summary;
                e.target.removeAttribute("style");

                resultHistory = JSON.parse(localStorage.getItem("resultHistory"));

                var date = new Date();

                resultHistory.unshift({ date: date.getDate()+"."+date.getMonth()+"."+date.getFullYear()+"/ "+
                 date.getHours()+":"+date.getMinutes()+":"+(date.getSeconds()> 10 ? date.getSeconds() : "0"+date.getSeconds()),score:summary});

                localStorage.setItem("resultHistory",JSON.stringify(resultHistory));
                console.log(localStorage.getItem("resultHistory"));

                //document.querySelector(".questionText").classList.add("invisible");
               // document.querySelector(".answers").classList.add("invisible");

               showScoreHistory();

               document.getElementById("scoreHistory").classList.remove("invisible");
             
             },500);
         
         }
        
        

    });
     
}




