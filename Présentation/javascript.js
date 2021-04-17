/*// Select all the elements that use a specified distinguisher.
const menuTriggers = document.querySelectorAll("[data-menu-toggle]");
// For each element, add a listener for the "click" event.
Array.prototype.forEach.apply(menuTriggers, [
  function(trigger) {
    trigger.addEventListener("click", function(e) {
      e.preventDefault(); // prevent default link behaviour
      // Toggle the sidebar when a click is detected.
      toggleSidebar(); // this function will be defined in a later step
    });
  }
]);*/


function out(a){
  console.log(a.classList, "lkjsfdgäl")
  a.classList.toggle("change"); /*Get the current element (this) and toggle the class between the "current" class und change (ajoute le class change apres lautre class)*/
 /*next = document.getElementsByClassName("button_next")
  next.style.right="200px"; */
  document.getElementById("button_next").style.color="blue"

}

/*
const menuIcon = document.querySelector(".hamburger-menu");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("change");
  console.log("lkdsjf")
})

/*
menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("change");
});
*/

    