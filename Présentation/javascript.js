var counter;
counter = 0

function out(a){
  console.log(a.classList, "lkjsfdgäl")
  a.classList.toggle("change"); /*Get the current element (this) and toggle the class between the "current" class und change (ajoute le class change apres lautre class)*/

if ((counter % 2) == 0) {
document.getElementById("button_next").style.right= "200px";}
else{
document.getElementById("button_next").style.right ="0px";

}
counter += 1
}

    