var stars = document.querySelectorAll(".rateStar");

var i=0;

for(i;i<stars.length;i++){
    stars[i].addEventListener('click',function(e){
        console.log("Id klikniętego elementu: ",e.target.id);
    });
}