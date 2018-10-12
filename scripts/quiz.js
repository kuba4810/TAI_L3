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
function showQuestion(q){
    document.getElementById("questionText").innerHTML = q.question;

    document.getElementById("a").innerHTML = q.answers[0];
    document.getElementById("b").innerHTML = q.answers[1];
    document.getElementById("c").innerHTML = q.answers[2];
    document.getElementById("d").innerHTML = q.answers[3];
}

localStorage.setItem("resulthistory","0");
localStorage.setItem("result","0");
var index = 0;
var progresBarWidth = index+1;
var question = questions[index];
showQuestion(question);

var time = 20;
    
function myTimeout(){
    return (setTimeout(function(){
        index = index+1;
        question = questions[index];
        showQuestion(question);
        clearInterval(myInterval);
        time=20;
        document.getElementById("time").classList.add("progress-bar-success");
    },20000))
}

function myInterval(){
    return(setInterval(function(){
        if(time > 0){
            time = time -1;
            document.getElementById("time").style.width = (time/2)*10 +"%";
            document.getElementById("time").innerHTML =  time+"s";
        }
    
    
        if(time <=10){
           document.getElementById("time").classList.remove("progress-bar-success");
           document.getElementById("time").classList.add("progress-bar-warning");
        }
        if(time <=5){
           document.getElementById("time").classList.remove("progress-bar-success");
           document.getElementById("time").classList.add("progress-bar-danger");
        }
    },1000))
}


myTimeout();
myInterval();



var answers = document.querySelectorAll(".list-group-item");
var i=0;
for(i;answers.length ; i++){
    answers[i].addEventListener('click',function(e){
        
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
            
            setTimeout(function(){
                myTimeout();
                myInterval();
                index = index+1;
                progresBarWidth = progresBarWidth+1;
                question = questions[index];
                showQuestion(question);
                document.getElementById("progress").style.width = progresBarWidth+"0%";
                document.getElementById("progress").innerHTML = progresBarWidth + "/10";
                e.target.removeAttribute("style");
             },500);
         }
         else{
            setTimeout(function(){
                var summary = localStorage.getItem("result");
                document.getElementById("result").innerHTML = "Udało Ci się ukończyć Quiz ! Twój wynik to : " + summary;
                e.target.removeAttribute("style");

             
             },500);
         
         }
        
        

    });
     
}




